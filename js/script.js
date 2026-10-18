const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

},{
    threshold:0.2
});

document.querySelectorAll(".fade").forEach(el=>{
    observer.observe(el);
});

const modal = document.querySelector(".modal");
const track = modal.querySelector(".modal-track");
const slides = [...modal.querySelectorAll(".modal-slide")];
const prevButton = modal.querySelector(".modal-prev");
const nextButton = modal.querySelector(".modal-next");
let current = 0;

const showSlide = (index) => {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    prevButton.classList.toggle("hidden", current === 0);
    nextButton.classList.toggle("hidden", current === slides.length - 1);
};

const openModal = (index) => {
    // 開くときは横移動のアニメーションをせず、その作品を直接表示する
    track.style.transition = "none";
    showSlide(index);
    track.offsetHeight;
    track.style.transition = "";

    modal.classList.add("open");
    document.body.classList.add("modal-open");
};

const closeModal = () => {
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
};

const moveModal = (step) => {
    const next = current + step;
    if(next < 0 || next >= slides.length) return;
    showSlide(next);
};

document.querySelectorAll(".work").forEach(work => {
    work.addEventListener("click", () => {
        openModal(slides.findIndex(slide => slide.id === work.dataset.modal));
    });
});

modal.addEventListener("click", (e) => {
    const target = e.target;

    if(target === modal || target.classList.contains("modal-slide") || target.classList.contains("modal-close")){
        closeModal();
    }
});

prevButton.addEventListener("click", () => moveModal(-1));
nextButton.addEventListener("click", () => moveModal(1));

document.addEventListener("keydown", (e) => {
    if(!modal.classList.contains("open")) return;

    if(e.key === "Escape"){
        closeModal();
    }else if(e.key === "ArrowLeft"){
        moveModal(-1);
    }else if(e.key === "ArrowRight"){
        moveModal(1);
    }
});
