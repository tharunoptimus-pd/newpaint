let createNewPaintDiv = document.getElementById("newPaint")
let createNewWithBordersDiv = document.getElementById("newWithBorders")
let createNewWithCat = document.getElementById("newWithCat")
createNewPaintDiv.addEventListener("click", (e) => {
	return (window.location.href = "/paint/new/create")
})
createNewWithBordersDiv.addEventListener("click", (e) => window.location.href = "/paint/new/create/border" )
createNewWithCat.addEventListener("click", (e) => window.location.href = "/paint/new/create/cat" )

let logoutButton = document.querySelector(".profilePhotoContainer")
logoutButton.addEventListener("click", (e) => {
	return (window.location.href = "/logout")
})

document.addEventListener("DOMContentLoaded", async () => {
	await loadAllPaints()
	addEventListenerToPaintContainer()

})

async function loadAllPaints () {
	let paints = await fetch("/api/paint/preview/paints", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	})
	if(paints.status !== 200) { return loadAllPaints() }
	let paintsJson = await paints.json()
	let recentPaints = document.querySelector(".recentPaints")
	recentPaints.innerHTML = ""
	
	let html = ""
	paintsJson.forEach((paint) => { 
		html += returnPaintContainer(paint)
	})
	recentPaints.innerHTML = html
	
}

function returnPaintContainer (data) {
	let url = data._id
	let title = data.title
	let src = data.data
	
	return `<div class="paintContainer" data-url="${url}">
	<img src="${src}" alt="${title}">
	<span>${title}</span>
	</div>`
}


function addEventListenerToPaintContainer () {
	document.querySelectorAll(".paintContainer").forEach((item) => {
		item.addEventListener("click", (event) => {
			let id = event.target.getAttribute("data-url")
			window.location.href = `paint/${id}`
		})
	})
}

if('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js')
			.then((reg) => console.log('Success: ', reg.scope))
			.catch((err) => console.log('Failure: ', err));
	})
}