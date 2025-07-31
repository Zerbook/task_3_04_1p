document.addEventListener("click", (event) => {
  const id = event.target.dataset.id;

  if (event.target.dataset.type === "remove") {
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    const oldTitle = event.target.dataset.title;
    const newTitle = prompt("Введите новое название:", oldTitle);

    if (newTitle === null) {
      return;
    }

    edit(id, newTitle).then(() => {
      const noteItem = event.target.closest("li");
      noteItem.querySelector(".note-title").textContent = newTitle;
      event.target.dataset.title = newTitle;
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}
async function edit(id, newTitle) {
  return await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: newTitle }),
  });
}
