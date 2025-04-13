fetch("data.json")
	.then((response) => response.json())
	.then((data) => {
		console.log("Fetched data:", data);
	})
	.catch((error) => {
		console.error("Error loading JSON:", error);
	});

function toggle(){
	document.documentElement.classList.toggle("dark");
	document.documentElement.classList.toggle("light");

}

const filterBtns= [...document.querySelector('.filter-btns').children]
// console.dir( filterBtns)

filterBtns.forEach((btn,index)=>{
	btn.addEventListener('click',(e)=>{
		// debugger
		e.preventDefault()
		for (let i = 0; i < filterBtns.length; i++) {
			if(i==index){
				filterBtns[i].classList.toggle('active-btn',true)
			}

			else{
				filterBtns[i].classList.toggle('active-btn',false)

			}
		} 
		// }
	})
})


document.querySelector(".switch").addEventListener("click", function (e) {
	// setTimeout(toggle,1000)
	document.documentElement.classList.toggle("dark");
	document.documentElement.classList.toggle("light");
	document.querySelector(".sun").classList.toggle("hidden");
	document.querySelector(".sun").classList.toggle("block");

	document.querySelector(".moon").classList.toggle("block");
	document.querySelector(".moon").classList.toggle("hidden");
});

// document.querySelector(".sun").addEventListener("click", function (e) {
// 	// debugger
// 	document.documentElement.classList.toggle("dark");
// 	document.documentElement.classList.toggle("light");

// 	document.querySelector(".sun").classList.toggle("block");
// 	document.querySelector(".sun").classList.toggle("hidden");

// 	document.querySelector(".moon").classList.remove("hidden");
// 	document.querySelector(".moon").classList.toggle("block");
// });

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
// debugger
// console.log(localStorage.theme)
document.documentElement.classList.toggle(
	"dark",
	localStorage.theme === "dark" ||
		(!("theme" in localStorage) &&
			window.matchMedia("(prefers-color-scheme: dark)").matches)
);
// Whenever the user explicitly chooses light mode
// localStorage.theme = "light";
// console.log(localStorage.theme)
// Whenever the user explicitly chooses dark mode	
// localStorage.theme = "dark";
// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem("theme");
if(document.documentElement.classList.contains("dark")){
	document.querySelector(".sun").classList.toggle("hidden");
	document.querySelector(".sun").classList.toggle("block");
}

if(document.documentElement.classList.contains("light")){
	document.querySelector(".moon").classList.toggle("hidden");
	document.querySelector(".moon").classList.toggle("block");
}