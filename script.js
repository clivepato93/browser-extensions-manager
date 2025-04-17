// debugger
// console.log(localStorage)
localStorage.clear();
if (localStorage.length == 0) {
	console.log("cleared");
}
// fetch("data.json").then((response) => response.json()).then((data)=>{
// 	console.log(data)
// 	localStorage.setItem('extensions',JSON.stringify(data))
// 	console.log(localStorage)
// })

const entries = performance.getEntriesByType("navigation");

function toggle() {
	document.documentElement.classList.toggle("dark");
	document.documentElement.classList.toggle("light");
}

const filterBtns = [...document.querySelector(".filter-btns").children];

filterBtns.forEach((btn, index) => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		if (index == 0) {
			generateComponents();
		}
		if (index == 1) {
			// console.log('true')
			generateComponents(true);
		}
		if (index == 2) {
			// console.log('true')
			generateComponents(false);
		}
		for (let i = 0; i < filterBtns.length; i++) {
			if (i == index) {
				filterBtns[i].classList.toggle("active-btn", true);
			} else {
				filterBtns[i].classList.toggle("active-btn", false);
			}
		}
	});
});

document.querySelector(".switch").addEventListener("click", function (e) {
	document.documentElement.classList.toggle("dark");
	// document.documentElement.classList.toggle("light");
	document.querySelector(".sun").classList.toggle("hidden");
	document.querySelector(".sun").classList.toggle("block");

	document.querySelector(".moon").classList.toggle("block");
	document.querySelector(".moon").classList.toggle("hidden");
});

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
// localStorage.removeItem("theme");
// debugger
if (document.documentElement.classList.contains("dark")) {
	// console.log('test')
	document.querySelector(".sun").classList.toggle("hidden");
	document.querySelector(".sun").classList.toggle("block");
} else {
	document.querySelector(".moon").classList.toggle("hidden");
	document.querySelector(".moon").classList.toggle("block");
}

function removeData(name, component) {
	const data = JSON.parse(localStorage.extensions);

	data.forEach((extension, i) => {
		if (extension.name == name) {
			const newData = data.splice(i, 1);
			// console.log(data)
			// console.log('removed')

			// debugger
			console.log("data ", data, JSON.parse(localStorage.extensions));
			localStorage.setItem("extensions", JSON.stringify(data));
			document.querySelector("main").removeChild(component);
		}
	});
}

function toggleActive(name) {
	const data = JSON.parse(localStorage.extensions);

	data.forEach((extension) => {
		if (extension.name == name) {
			extension.isActive = !extension.isActive;
			// const newData=	data.splice(i,1)
			// console.log(data)
			console.log("removed");
			debugger;
			console.log("data ", data);
			localStorage.setItem("extensions", JSON.stringify(data));
			console.log(JSON.parse(localStorage.extensions));
		}
	});
	// console.log(component)
}

function generateComponents(filter = null) {
	document.querySelector("main").innerHTML = "";

	if (filter === true) {
		const data = JSON.parse(localStorage.extensions).filter(
			(component) => component.isActive == true
		);
		data.forEach((component) => {
			createComponent(component);
		});}
		else if (filter === false) {
			console.log("line 134");
			const data = JSON.parse(localStorage.extensions).filter(
				(component) => component.isActive === false
			);
			data.forEach((component) => {
				createComponent(component);
			});
		}
	 else if (localStorage.extensions) {
		JSON.parse(localStorage.extensions).forEach((component) => {
			createComponent(component);
		});
	}
	// debugger
	else {
		fetch("data.json")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				localStorage.setItem("extensions", JSON.stringify(data));
				data.forEach((component) => {
					createComponent(component);
				});
				// localStorage.setItem('extensions',JSON.stringify( data))
			})
			.catch((err) => console.log(err));
	}
}

generateComponents();

function createComponent(component) {
	const article = document.createElement("article");
	const section = document.createElement("section");

	const img = document.createElement("img");
	img.classList.add("extension-img");
	img.src = component.logo;
	const sectionRight = document.createElement("div");
	const h3 = document.createElement("h3");
	const paragraph = document.createElement("p");
	paragraph.textContent = component.description;
	h3.textContent = component.name;
	sectionRight.classList.add("right");
	const sectionFooter = document.createElement("section");
	sectionFooter.classList.add("footer");
	const button = document.createElement("button");
	// debugger
	button.addEventListener("click", function (e) {
		e.preventDefault();
		removeData(component.name, article);
	});
	button.textContent = "Remove";
	const div = document.createElement("div");
	div.classList.add("relative");
	const input = document.createElement("input");
	input.type = "checkbox";
	input.addEventListener("click", function () {
		toggleActive(component.name);
	});
	input.classList.add("colourswitch");
	input.checked = component.isActive ? "checked" : "";
	const colourswitchlabel = document.createElement("div");
	colourswitchlabel.classList.add("colourswitchlabel");
	// <input type="checkbox" class="colourswitch" checked />
	// <div class="colourswitchlabel"></div>
	div.append(input, colourswitchlabel);
	sectionFooter.append(button, div);
	button.classList.add("remove-btn");
	section.append(img, sectionRight);
	sectionRight.append(h3, paragraph);
	article.append(section, sectionFooter);
	document.querySelector("main").append(article);
}

// entries.forEach((entry)=>{
// 	if(entry.type=='reload'){
// 		debugger
// 		console.log('reload')
// 		localStorage.clear()
// const data = fetch("data.json").then((response) => response.json()).then((data)=>{
// 	console.log(data)
// 	localStorage.setItem('extensions',JSON.stringify( data))
// 	debugger
// }).catch((error) => {
// 	console.error("Error loading JSON:", error);
// });
// localStorage.setItem('extensions',JSON.stringify(data))
// }})
// 	}
// })
// const observer = new PerformanceObserver((list)=>{
// 	list.getEntries().forEach((entry)=>{
// 		if(entry.type=='reload'){
// 			debugger
// 			console.log('reload')
// 			localStorage.clear();

// 		}
// 	})
// })

/*
			<article
				class="dark:bg-Neutral-800 bg-Neutral-0 py-7 px-3 flex flex-col justify-between rounded-xl border-2 border-Neutral-100 dark:border-Neutral-600"
			>
				<section class="header flex">
					<img
						src="/assets/images/logo-devlens.svg"
						alt=""
						class="mr-4 h-fit"
					/>
					<div class="right">
						<h3 class="title text-xl font-bold">DevLens</h3>
						<p class="">
							Quickly inspect page layouts and visualize element boundaries.
						</p>
					</div>
				</section>
				<section class="footer mt-8 flex justify-between items-center">
					<button class="remove-btn">Remove</button>
					<div class="relative">
						<input type="checkbox" class="colourswitch" checked />
						<div class="colourswitchlabel"></div>
					</div>
				</section>
			</article>
			*/
