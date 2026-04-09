import express from "express";
import cors from "cors";
import { Resend } from "resend";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Initialize Resend with API key if available
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

  // API routes FIRST
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/subscribe", async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    try {
      // If Resend API key is configured, send a welcome email
      if (resend) {
        await resend.emails.send({
          from: "Little Elm TSA <onboarding@resend.dev>", // Use a verified domain in production
          to: email,
          subject: "Welcome to Little Elm TSA Newsletter!",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #3B6DF6;">Welcome to Little Elm TSA!</h1>
              <p>Thank you for subscribing to our newsletter. We'll keep you updated with the latest news, competition updates, and chapter events.</p>
              <p>Stay tuned for more updates!</p>
              <br/>
              <p>Best regards,</p>
              <p><strong>Little Elm High School TSA Chapter</strong></p>
            </div>
          `,
        });
      } else {
        console.log(`[Mock Email] Subscription email would have been sent to ${email}. Set RESEND_API_KEY to enable real emails.`);
      }

      res.json({ success: true, message: "Subscribed successfully" });
    } catch (error) {
      console.error("Subscription error:", error);
      res.status(500).json({ error: "Failed to process subscription" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
