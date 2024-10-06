    // You can add other event listeners or functions here as neede

    const reload = document.getElementById("reload");
    reload.addEventListener("click", () => {
        reload.classList.add("rotate"); // Add the rotation class

        setTimeout(() => {
            location.reload(); // Reload the page after 0.5 seconds
        }, 500); // Duration should match the CSS animation duration
    });