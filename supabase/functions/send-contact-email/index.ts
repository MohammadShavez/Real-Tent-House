// supabase/functions/send-contact-email/index.ts
/// <reference lib="deno.ns" />

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

Deno.serve(async (req: Request) => {
  // Allow browser requests
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  try {
    // Only allow POST
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Only POST requests are allowed.",
        }),
        {
          status: 405,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Check API key
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing.");

      return new Response(
        JSON.stringify({
          success: false,
          error: "Email service is not configured.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Read request body
    const {
      name,
      phone,
      email,
      eventType,
      message,
    } = await req.json();

    // Validate required fields
    if (!name || !phone || !eventType || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Name, phone, event type and message are required.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Email is required for customer notification
    if (!email) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            "Please enter your email address to receive confirmation.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Send email using Resend
    const resendResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },

        body: JSON.stringify({
          from: "Real Tent House <onboarding@resend.dev>",

          to: [email],

          subject:
            "Thank You for Contacting Real Tent House",

          html: `
            <!DOCTYPE html>

            <html>
              <head>
                <meta charset="UTF-8" />

                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0"
                />
              </head>

              <body
                style="
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
                  font-family: Arial, Helvetica, sans-serif;
                "
              >

                <div
                  style="
                    max-width: 600px;
                    margin: 30px auto;
                    background-color: #ffffff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
                  "
                >

                  <div
                    style="
                      background-color: #111827;
                      padding: 25px;
                      text-align: center;
                    "
                  >

                    <h1
                      style="
                        margin: 0;
                        color: #ffffff;
                        font-size: 26px;
                      "
                    >
                      Real Tent House
                    </h1>

                    <p
                      style="
                        color: #d1d5db;
                        margin: 8px 0 0;
                      "
                    >
                      Event & Tent Services
                    </p>

                  </div>

                  <div
                    style="
                      padding: 30px;
                      color: #333333;
                    "
                  >

                    <h2
                      style="
                        margin-top: 0;
                        color: #111827;
                      "
                    >
                      Thank You, ${name}!
                    </h2>

                    <p>
                      We have successfully received your
                      enquiry.
                    </p>

                    <p>
                      Our team will review your request and
                      contact you soon.
                    </p>

                    <div
                      style="
                        margin-top: 25px;
                        padding: 20px;
                        background-color: #f9fafb;
                        border-radius: 8px;
                      "
                    >

                      <h3
                        style="
                          margin-top: 0;
                          color: #111827;
                        "
                      >
                        Your Enquiry Details
                      </h3>

                      <p>
                        <strong>Name:</strong>
                        ${name}
                      </p>

                      <p>
                        <strong>Phone:</strong>
                        ${phone}
                      </p>

                      <p>
                        <strong>Email:</strong>
                        ${email}
                      </p>

                      <p>
                        <strong>Event Type:</strong>
                        ${eventType}
                      </p>

                      <p>
                        <strong>Message:</strong>
                      </p>

                      <p>
                        ${message}
                      </p>

                    </div>

                    <p
                      style="
                        margin-top: 25px;
                      "
                    >
                      Thank you for choosing
                      <strong>Real Tent House</strong>.
                    </p>

                    <p>
                      Regards,<br />
                      <strong>Real Tent House Team</strong>
                    </p>

                  </div>

                  <div
                    style="
                      background-color: #f9fafb;
                      padding: 20px;
                      text-align: center;
                      font-size: 13px;
                      color: #6b7280;
                    "
                  >
                    Uttar Pradesh, India
                  </div>

                </div>

              </body>
            </html>
          `,
        }),
      }
    );

    const resendResult = await resendResponse.json();

    // Resend error
    if (!resendResponse.ok) {
      console.error(
        "Resend API Error:",
        resendResult
      );

      return new Response(
        JSON.stringify({
          success: false,
          error: "Unable to send confirmation email.",
          details: resendResult,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Success
    console.log(
      "Email sent successfully:",
      resendResult
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "Confirmation email sent successfully.",
        id: resendResult.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

  } catch (error) {
    console.error(
      "Edge Function Error:",
      error
    );

    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown server error.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});