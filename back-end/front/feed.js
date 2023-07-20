function abreModal(event) {
    event.preventDefault();
    let publishContent = document.querySelector(".modal-overlay");
    publishContent.classList.add("modal-visible")
};

function fechaModal(event) {
    event.preventDefault();
    let publishContent = document.querySelector(".modal-overlay");
    publishContent.classList.remove("modal-visible")
};

// Most options demonstrate the non-default behavior
var simplemde = new SimpleMDE({
	element: document.getElementById("md"),
	placeholder: "Converse com a gente...",
    toolbar: ["bold", "italic", "heading", "link", "image", "|", "guide"]
});
