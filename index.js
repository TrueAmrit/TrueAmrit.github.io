var mynote = 0;
function getdate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    var currentDate = `${day}-${month}-${year}`;
    return currentDate;
}

function addlist() {
    var t = document.getElementById("tittle").value;
    if (t === '') {
        alert("TITTLE CANNOT BE BLANK");
    } else {
        var div = document.createElement("div")
        div.className = "note-card"
        div.id = "note" + mynote
        console.log(div.id)

        var cur_tittle = "tittle" + mynote;
        var cur_note = "note" + mynote
        storevalue(cur_tittle, cur_note);

        let tittle = localStorage.getItem(cur_tittle)
        let note = localStorage.getItem(cur_note)


        var tittle_node = document.createElement("h2")
        tittle_node.id = "h" + mynote;
        tittle_node.innerHTML = tittle;
        div.appendChild(tittle_node);
        var note_node = document.createElement("div");
        note_node.id = "p" + mynote;
        note_node.innerHTML = note;
        div.appendChild(note_node);



        var addbtn = document.createElement("button");
        var editbtn = document.createElement("button");
        editbtn.id = "e" + mynote;
        addbtn.id = "d" + mynote;
        editbtn.innerHTML = "Edit";
        div.appendChild(editbtn);
        addbtn.innerHTML = "Delete";
        div.appendChild(addbtn);
        var date = document.createElement("p1")
        date.className = "date"
        div.appendChild(date);
        var date_value = getdate();
        date.innerHTML = date_value

        addbtn.addEventListener('click', dlt)
        // editbtn.addEventListener('click', edit)
        var lower = document.getElementById('lower');
        lower.appendChild(div);
        mynote++;
        no_note();
        document.getElementById("tittle").value = "";
        document.getElementById("note").value = "";
    }
}
document.getElementById("lower").addEventListener('click', (e) => {

    let target = e.target.id;
    tar = target.slice(0, 1)
    let t = target.slice(1)
    console.log(e, tar);
    if (tar == "e") {
        edit(t)
    }

})

function dlt(e) {
    let id = e.target.id;
    let value = getvalue(id)
    var cnf = document.getElementById("delete")
    cnf.style.display = "flex";
    console.log(e)
    var target = e.path[1]
    console.log(target);
    cnf.addEventListener('click', (e) => {
        console.log(e.target.id);
        if (e.target.id == "dltbtn") {
            document.getElementById("lower").removeChild(target)
            cnf.style.display = "none";
            localStorage.removeItem("tittle" + id)
            localStorage.removeItem("note" + id)
            no_note()
        }
        if (e.target.id == "cancelbtn") {
            cnf.style.display = "none";
        }
    })
}
function edit(e) {
    id = e;
    console.log(id)
    value = getvalue(id)
    console.log(value)
    var editblock = document.getElementById("edit")
    editblock.style.display = "flex";
    document.getElementById("edit_tittle").value = value[0]
    document.getElementById("edit_note").value = value[1]
    // console.log(e)
    document.getElementById("savebtn").addEventListener('click', savedetail)

    document.getElementById("cancel_btn").addEventListener('click', () => {
        editblock.style.display = "none";
    })
}
function savedetail(e) {
    let updated_tittle = document.getElementById("edit_tittle").value;
    let updated_note = document.getElementById("edit_note").value;
    if (updated_tittle) {
        localStorage.setItem("tittle" + id, updated_tittle)
        localStorage.setItem("note" + id, updated_note)
        document.getElementById("h" + id).innerHTML = updated_tittle;
        document.getElementById("p" + id).innerHTML = updated_note;
        // console.log(value[0], updated_tittle, value[1], updated_note)
        document.getElementById("edit").style.display = "none";
    }
    else {
        alert("TITTLE CANNOT BE BLANK");
    }
}

function storevalue(cur_tittle, cur_note) {
    let tittle = document.getElementById("tittle");
    localStorage.setItem(cur_tittle, tittle.value);

    let note = document.getElementById("note")
    localStorage.setItem(cur_note, note.value);

}
function getvalue(id) {
    return [
        localStorage.getItem('tittle' + id),
        localStorage.getItem('note' + id)]
}

function no_note() {
    let lower = document.getElementById("lower")
    let footer = document.getElementById("footer")
    if (lower.hasChildNodes()) {
        footer.style.display = "none"
    }
    else {
        footer.style.display = "flex"
    }
}

