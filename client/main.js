window.onload = () => {
    const form = document.querySelector("form");
    let socket;

    form.addEventListener("submit", (ev) => {
        ev.preventDefault();

        const data = new FormData(form);

        fetch("http://localhost:3000/", {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((res) => {
                socket = io("http://localhost:4000/");
                socket.on("message", (data) => console.log(data));
                socket.emit("message", res.requestId);
                socket.on("result", (result) => {
                    const { filename, content } = result;
                    document.getElementById("filename").innerHTML = filename;
                    document.getElementById("content").innerHTML = content;
                    socket.disconnect();
                });
            });
    });
};
