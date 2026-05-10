import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { Resend } from "resend";
import { createServer as createViteServer } from "vite";
import path from "path";

// ---------------------------------------------------------------------------
// Prototype-pollution guard — rejects bodies containing dangerous keys
// ---------------------------------------------------------------------------
function rejectPrototypePollution(
  obj: Record<string, unknown>,
  res: express.Response
): boolean {
  const dangerous = ["__proto__", "constructor", "prototype"];
  for (const key of dangerous) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      res.status(400).json({
        error: "Invalid request: disallowed key in payload",
      });
      return true;
    }
  }
  return false;
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // -----------------------------------------------------------------------
  // Task 4: Security headers via Helmet
  // -----------------------------------------------------------------------
  app.use(helmet());

  // -----------------------------------------------------------------------
  // Task 4: Restricted CORS — honour ALLOWED_ORIGIN env var; default to
  //         localhost:3000 for development. Never use wildcard in production.
  // -----------------------------------------------------------------------
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:3000";
  app.use(
    cors({
      origin: allowedOrigin,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // -----------------------------------------------------------------------
  // Task 3: Payload limits — reject oversized bodies early
  // -----------------------------------------------------------------------
  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: false, limit: "10kb" }));

  // -----------------------------------------------------------------------
  // Task 1: Rate limiters
  // -----------------------------------------------------------------------

  // Strict limiter for auth-related endpoints: 5 requests / 15 min per IP
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error:
        "Too many authentication attempts from this IP. Please try again after 15 minutes.",
    },
  });

  // General limiter for all other API endpoints: 100 requests / 15 min per IP
  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error:
        "Too many requests from this IP. Please try again after 15 minutes.",
    },
  });

  // Apply general limiter to all /api/* routes up front; auth routes will
  // additionally carry the strict limiter applied at the route level below.
  app.use("/api/", generalLimiter);

  // -----------------------------------------------------------------------
  // Initialize Resend
  // -----------------------------------------------------------------------
  const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

  // -----------------------------------------------------------------------
  // API routes
  // -----------------------------------------------------------------------
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Auth-adjacent subscription endpoint — strict rate limit applied
  app.post("/api/subscribe", authLimiter, async (req, res) => {
    const body = req.body as Record<string, unknown>;

    // Task 3: prototype-pollution guard
    if (rejectPrototypePollution(body, res)) return;

    const { email } = body;

    // Task 3: required-field validation
    if (!email || typeof email !== "string" || email.trim() === "") {
      return res.status(400).json({ error: "A valid email address is required" });
    }

    try {
      if (resend) {
        await resend.emails.send({
          from: "Little Elm TSA <onboarding@resend.dev>",
          to: email.trim(),
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
        console.log(
          `[Mock Email] Subscription email would have been sent to ${email}. Set RESEND_API_KEY to enable real emails.`
        );
      }

      res.json({ success: true, message: "Subscribed successfully" });
    } catch (error) {
      console.error("Subscription error:", error);
      res.status(500).json({ error: "Failed to process subscription" });
    }
  });

  // -----------------------------------------------------------------------
  // Vite middleware (dev) / static file serving (prod)
  // -----------------------------------------------------------------------
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
