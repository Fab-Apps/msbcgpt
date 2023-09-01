async function query(data) {
    const response = await fetch(
        "https://www.stack-inference.com/run_deployed_flow?flow_id=64e49c5d862c6cd6fc8dfb0a&org=1485f245-0c61-4c1e-962e-75756c3daef0",
        {
            headers: {
                'Authorization': 'Bearer 876240de-2778-4f22-983e-a2255563cee0',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

document.getElementById('user-input').addEventListener('keydown', async function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        const userInput = event.target.value;
        const conversationDiv = document.getElementById('conversation');

        if (userInput) {
            conversationDiv.innerHTML += `<div class="user-message">${userInput}</div>`;
            conversationDiv.innerHTML += '<div class="bot-message">Thinking...</div>';
            event.target.value = '';

            const response = await query({ "in-0": userInput });
            const responseMessage = response['out-0'];

            conversationDiv.innerHTML = conversationDiv.innerHTML.replace(/Thinking\.\.\./, responseMessage);
            conversationDiv.scrollTop = conversationDiv.scrollHeight;
        }
    }
});
