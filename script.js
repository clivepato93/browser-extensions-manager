
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
	// document.documentElement.classList.toggle("light");
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
	// localStorage.removeItem("theme");
	// debugger
	if(document.documentElement.classList.contains("dark")){
		console.log('test')
		document.querySelector(".sun").classList.toggle("hidden");
		document.querySelector(".sun").classList.toggle("block");
	}
	
	else{
		document.querySelector(".moon").classList.toggle("hidden");
		document.querySelector(".moon").classList.toggle("block");
	}

	fetch("data.json")
		.then((response) => response.json())
		.then((data) => {
			console.log("Fetched data:", data);
			data.forEach((component)=>{

				const article = document.createElement('article')
				const section =document.createElement('section')
				
				const img = document.createElement('img');
				img.classList.add("extension-img");
				img.src= component.logo
				const sectionRight = document.createElement('div')
				const h3 = document.createElement('h3')
				const paragraph = document.createElement('p')
				paragraph.textContent = component.description
				h3.textContent = component.name
				sectionRight.classList.add('right')
				const sectionFooter= document.createElement('section')
				sectionFooter.classList.add('footer')
				section.append(img,sectionRight)
				sectionRight.append(h3,paragraph)
				article.append(section)
				document.querySelector('main').append(article)
			})
			
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
					<button class="border-2 rounded-xl px-2 py-1">Remove</button>
					<div class="relative">
						<input type="checkbox" class="colourswitch" checked />
						<div class="colourswitchlabel"></div>
					</div>
				</section>
			</article>
			*/
			
		})
		.catch((error) => {
			console.error("Error loading JSON:", error);
		});