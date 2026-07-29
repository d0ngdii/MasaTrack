export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const appsScriptUrl =
      "https://script.google.com/macros/s/AKfycbzG-DX_UT-9gouLoHJuEQR-M8dw2zZFEJ0uVtE7JJh5VVgvOqOKPePePUsmGMxmrYBr/exec";

    const upstream = await fetch(appsScriptUrl, {
      method: "POST",
      body: new URLSearchParams({
        action: "submit",
        payload: JSON.stringify(req.body),
      }),
    });

    const text = await upstream.text();

    return res.status(upstream.status).send(text);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.toString(),
    });
  }
}
