
let extensionData = [];

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

document.documentElement.classList.toggle("dark",window.matchMedia("(prefers-color-scheme: dark)").matches));
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
	
	extensionData.forEach((extension, i) => {
		debugger
		if (extension.name == name) {
			extensionData.splice(i, 1);
			document.querySelector("main").removeChild(component);
		}
	});
}

function toggleActiveState(name) {
	
	
	
	extensionData.forEach((extension) => {
		debugger;
		if (extension.name == name) {
			extension.isActive = !extension.isActive;
		}
	});
	setTimeout(function(){
		if(filterBtns[1].classList.contains('active-btn') ){
			generateComponents(true)
		}
		
		else if(filterBtns[2].classList.contains('active-btn') ){
			generateComponents(false)
		}

	},1050)

	

}

function generateComponents(filter = null) {
	document.querySelector("main").innerHTML = "";

	if (filter === true) {
		const data= extensionData.filter(
			(component) => component.isActive == true
		);
		data.forEach((component) => {
			createComponent(component);
		});}
		else if (filter === false) {
			const data = extensionData.filter(
				(component) => component.isActive === false
			);
			data.forEach((component) => {
				createComponent(component);
			});
		}
	 else if (extensionData.length) {
		extensionData.forEach((component) => {
			createComponent(component);
		});
	}
	else {
		fetch("data.json")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				debugger
				data.forEach((component) => {
					createComponent(component);
					extensionData.push(component)
				});
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
		toggleActiveState(component.name);
	});
	input.classList.add("colourswitch");
	input.checked = component.isActive ? "checked" : "";
	const colourswitchlabel = document.createElement("div");
	colourswitchlabel.classList.add("colourswitchlabel");
	div.append(input, colourswitchlabel);
	sectionFooter.append(button, div);
	button.classList.add("remove-btn");
	section.append(img, sectionRight);
	sectionRight.append(h3, paragraph);
	article.append(section, sectionFooter);
	document.querySelector("main").append(article);
}
