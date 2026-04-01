import type { Context } from "@netlify/functions";

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const TELEGRAM_BOT_TOKEN = Netlify.env.get("TELEGRAM_BOT_TOKEN");
  const TELEGRAM_CHAT_ID = Netlify.env.get("TELEGRAM_CHAT_ID");

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return new Response(
      JSON.stringify({ success: false, error: "Server configuration error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const { name, contact, task } = await req.json();

  if (!name || !contact || !task) {
    return new Response(
      JSON.stringify({ success: false, error: "All fields are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const message = [
    "📩 Новая заявка с famteam.pro",
    "",
    `👤 Имя: ${name}`,
    `📱 Контакт: ${contact}`,
    `📝 Задача: ${task}`,
    "",
    `🕐 ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`,
  ].join("\n");

  const telegramRes = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    }
  );

  if (!telegramRes.ok) {
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send message" }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ success: true }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};
