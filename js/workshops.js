function datePassed(date){
  var workshopyy = Number(date.slice(0,2));
  var workshopMM = Number(date.slice(2,4));
  var workshopdd = Number(date.slice(4,6));
  var workshophh = Number(date.slice(7,9));
  var workshopmm = Number(date.slice(9,11));
  var currentDate = new Date();
  var currentyy = Number(String(currentDate.getFullYear()).slice(2,4));
  var currentMM = currentDate.getMonth()+1;
  var currentdd = currentDate.getDate();
  var currenthh = currentDate.getHours();
  var currentmm = currentDate.getMinutes();
  
  if (workshopyy == currentyy && workshopMM == currentMM && workshopdd == currentdd) {
    if (workshophh < currenthh) {
      return true;
    } else if (workshophh > currenthh) {
      return false;
    } else {
      if (workshopmm <= currentmm){
        return true;
      } else if (workshopmm > currentmm){
        return false;
      }
    }
  }

  if(workshopyy < currentyy){
    return true;
  } else if (workshopMM < currentMM){
    return true;
  } else if (workshopdd < currentdd){
    return true;
  } else {
    return false;
  }
}

let container
let workshops
let colors = ['pink', 'lightblue', 'lightgreen']

$(document).ready(() => {
	fetch()
	container = document.getElementById('workshops-container')
	console.log(container);
})

let populate = (d) => {
	workshops = d
	console.log(workshops)
	for(let index in workshops)
		createWorkshop(workshops[index], index)
}

let createWorkshop = (_ws, _i) => {
	let side = _i % 2 == 0 ? 'left' : 'right'

	let cont = createEl('div', ['workshop-container', 'container-'+side].join(' '))

	let t = createEl('div', ['workshop-title', 'bg-'+colors[_i%3]].join(' '), _ws.title)
	t.setAttribute('onclick', 'expand(this, "'+colors[_i%3]+'")')
	cont.appendChild(t)

	let sub_cont = createEl('div', ['workshop-subcontainer', 'subcontainer-'+side].join(' '))


	let instructor = createEl('div', 'workshop-instructor', _ws.instructor)
	sub_cont.appendChild(instructor)
	let date = createEl('div', 'workshop-date', _ws.date.human)
	sub_cont.appendChild(date)

	let loc = createEl('div', 'workshop-location', _ws.location)
	sub_cont.appendChild(loc)

	let desc = createEl('div', 'workshop-description', _ws.description)
	sub_cont.appendChild(desc)

	let tags = createEl('div', 'workshop-tags', _ws.tags.join(' - '))
//	sub_cont.appendChild(tags)

	let links = createEl('div', 'workshop-links')
	for(let l of _ws.links){
		let link = createEl('a', 'workshop-link', l.text)
		link.setAttribute('href', l.url)
		links.appendChild(link)
	}

	sub_cont.appendChild(links)

	cont.appendChild(sub_cont)

	container.appendChild(cont)

}


let expand = (_el, _col) => {
	let subcont = _el.parentNode.children[1]
	if(subcont.style.color == 'black'){
		subcont.style.width = '0px'
		subcont.style.color = 'white'
	}else{
		subcont.style.width = '800px'
		subcont.style.color = 'black' 
	}

	document.body.style.backgroundColor = _col
}
