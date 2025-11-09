document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const responseMsg = document.getElementById("responseMessage");

    const res = await fetch("/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();
    if (data.success) {
        responseMsg.textContent = "✅ Message sent successfully!";
        document.getElementById("contactForm").reset();
    } else {
        responseMsg.textContent = "❌ Failed to send message. Try again later.";
    }
});
