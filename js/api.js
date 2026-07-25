module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const appsScriptUrl =
      "https://script.google.com/macros/s/AKfycbwwUcJEFCf4a6nucGB3dgUlQsPmIKP1d2zdDllckBsPGSFPmbI7SoS1o5I_9kFxI2CV/exec";

    const upstream = await fetch(appsScriptUrl, {
      method: "POST",
      body: new URLSearchParams({
        action: "submit",
        payload: JSON.stringify(req.body),
      }),
    });

    const text = await upstream.text();

    res.setHeader("Content-Type", "application/json");
    return res.status(200).send(text);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.toString(),
    });
  }
};
