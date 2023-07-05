document.addEventListener("DOMContentLoaded", () => {
    let publishButton = document.getElementById("publicar");
    let publishContent = document.getElementById("content");
    let publishCancel = document.getElementById("cancelar");
    let commentButton = document.getElementById("comment-button");

    publishButton.addEventListener("click", () => {
        publishContent.style.display = "block";
    });

    commentButton.addEventListener("click", () => {
        publishContent.style.display = "block";
    });

    publishCancel.addEventListener("click", () => {
        publishContent.style.display = "none";
    });
});