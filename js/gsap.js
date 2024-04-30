const gridParent = document.querySelector(".projects");
const gridCells = [...document.querySelectorAll(".project")];
const navigation = document.querySelector(".header_menu");
let cellSizes = gridCells.map((item) => item.getBoundingClientRect());

window.addEventListener("resize", (e) => {
  gsap.set(gridParent, { x: 0, y: 0 });
  cellSizes = gridCells.map((item) => item.getBoundingClientRect());
});

const changeCell = (index) => {
  const tl = gsap.timeline({
    defaults: {
      duration: 1,
      ease: "none",
    },
  });

  tl.to("#feturbulence", {
    attr: { baseFrequency: "0.01" },
  })
    .to(
      gridParent,
      {
        duration: 2,
        ease: "power4.inOut",
        x: -cellSizes[index].x,
        y: -cellSizes[index].y,
        force3d: true,
      },
      "<"
    )
    .to(
      "#feturbulence",
      {
        attr: { baseFrequency: "0.00" },
      },
      "-=1"
    );

  return tl;
};

const buttons = navigation.querySelectorAll("button");
buttons.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    gsap.set(buttons, { opacity: 0.5 });

    gsap.set(btn, {
      opacity: 1,
    });

    changeCell(index).play();
  });
});

const gameListNavigation = document.querySelector(".game_list"); // game_list 선택
const gameListButtons = gameListNavigation.querySelectorAll("button"); // game_list 내의 모든 버튼을 선택

// game_list 내의 버튼들에 대해서도 동일한 클릭 이벤트리스너 적용
gameListButtons.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    gsap.set(gameListButtons, { opacity: 0.5 }); // 기존 버튼들의 투명도 조정
    gsap.set(btn, { opacity: 1 }); // 클릭된 버튼만 투명도를 높여 강조

    changeCell(index % gridCells.length).play(); // index가 gridCells 배열의 길이를 초과하지 않도록 조정
  });
});
