/* your JS code here */
{
//add listener for Add button
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById("addButton").addEventListener("click", createTask);
    });

//add listener for Sort button
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById("sortByAB").addEventListener("click", () => {
            listOfTasksJS.sort((a, b) => {
                return (a.title > b.title ? 1 : -1);
            })
            printList();
        });
    });

//add listener for sort button
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById("sortByPriority").addEventListener('click', () => {
            listOfTasksJS.sort((a, b) => {
                return (a.priority >= b.priority ? 1 : -1);
            })
            printList();
        });
    });

//add listener for high priority button
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById("btn_highPriority").addEventListener("click", ShowHighPriority);
    });

//all task has titel,description and priority(1 to 3)
    class Task {
        constructor(title, description, priority) {
            this.title = title;
            this.description = description;
            this.priority = priority;
        }
    }

    let listOfTasksJS = [];
    let boolHighPriority = false;


    function itsNewTask(newTitle)
//can't be 2 task whit same title
    {
        for (let t of listOfTasksJS) {
            if (t.title === newTitle)
                return false;
        }
        return true;
    }

    function validText(str)
//whit regex we find if it's only nums or latter's
    {
        const letterNumber = /^[0-9a-zA-Z\s]+$/;
        for (let l of str) {
            if (!(l.match(letterNumber)))
                return false
        }
        return !(str.trim() === "")
    }

    function createTask()
//read input from HTML creat new task and save on list
    {
        if (validText(document.getElementById("titleInput").value)) {
            if (validText(document.getElementById("descriptionInput").value)) {
                if (itsNewTask(document.getElementById("titleInput").value)) {
                    let newTask = new Task(document.getElementById("titleInput").value.trim(),
                        document.getElementById("descriptionInput").value.trim(),
                        document.getElementById("checkBox").checked ? "1" : "2");
                    listOfTasksJS.push(newTask); // attach the new item
                    //reset all input area for new task
                    printError('');
                    document.getElementById('titleInput').classList.remove('is-invalid');
                    document.getElementById('titleInput').value = '';
                    document.getElementById('descriptionInput').classList.remove('is-invalid');
                    document.getElementById('descriptionInput').value = '';
                    document.getElementById('checkBox').value = false;
                    document.getElementById("errorArea").classList.add('d-none');
                    printList();
                }
                //all the else is if something is unevaluated
                else {
                    printError('The Task Already Exists!');
                    document.getElementById('titleInput').classList.add('is-invalid');
                }
            } else {
                printError('Not Valid Description! only latter and digits');
                document.getElementById('descriptionInput').classList.add('is-invalid');
            }
        } else {
            printError('Not Valid Title! only latter and digits');
            document.getElementById('titleInput').classList.add('is-invalid');
        }
    }

    function printError(str)
//print error msg costume to the error. base on HTML page
    {
        let msg = document.getElementById("errorsMsg");
        msg.innerHTML = "<div id='errorsMsg'>" + str + "</div>";
        let area = document.getElementById("errorArea");
        area.classList.remove('d-none');
    }

    function printTask(task) {
        let result = "<li><h3>" + task.title + "</h3>";
        result += "<h6>" + task.description + "</h6>";
        result += "<button class = 'b_delete bg-danger text-white'> delete </button><button class= 'b_done bg-success text-light'> done </button></li>";
        // add the delete button and done button next to the new item

        return result;
    }

    function printList() {
        let list = document.getElementById("listOfTasks");

        list.innerHTML = "<ol id='listOfTasks'>";
        for (let c of listOfTasksJS) {
            list.innerHTML += printTask(c);
        }
        list += "</ol>";

        //after the printing we color all task by priority
        //Synchronizes the list with an oectonic and paints accordingly
        let color = document.getElementsByTagName('li')
        for (let c of color) {
            for (let p of listOfTasksJS) {
                if (p.title === c.firstElementChild.innerHTML) {
                    switch (p.priority) {
                        case "1":
                            c.classList.remove("bg-danger", "bg-success", "bg-primary", "text-white", "text-dark", "bg-opacity-50", "bg-opacity-25");
                            c.classList.add("bg-danger", "bg-opacity-50");
                            break;
                        case "3":
                            c.classList.remove("bg-danger", "bg-success", "bg-primary", "text-white", "text-dark", "bg-opacity-50", "bg-opacity-25");
                            c.classList.add("bg-success", "bg-opacity-75", "not_red");
                            break;
                        case"2":
                        default:// === "2"
                            c.classList.remove("bg-danger", "bg-success", "bg-primary", "text-white", "text-dark", "bg-opacity-50", "bg-opacity-25");
                            c.classList.add("bg-primary", "bg-opacity-50", "not_red");
                            break;
                    }
                }
            }
        }
        //add lister to delete button
        //delete from html and from list also
        let deleteButtons = document.getElementsByClassName("b_delete");
        for (let but of deleteButtons)
            but.addEventListener('click', function (event) {
                const index = listOfTasksJS.findIndex(ele => ele.title === event.target.parentElement.firstElementChild.innerHTML)
                event.target.parentElement.remove();
                listOfTasksJS.splice(index, 1);
            });
        //add lister to done button
        //color html to green and edit task to priority 3 => completed
        let doneButtons = document.getElementsByClassName("b_done");
        for (let but of doneButtons)
            but.addEventListener('click', function (event) {
                const index = listOfTasksJS.findIndex(ele => ele.title === event.target.parentElement.firstElementChild.innerHTML)
                listOfTasksJS[index].priority = '3';
                event.target.parentElement.classList.remove("bg-danger", "bg-success", "bg-primary", "text-white", "text-dark", "bg-opacity-50", "bg-opacity-25");
                event.target.parentElement.classList.add("bg-success", "bg-opacity-75", "not_red");
            });
    }

    function ShowHighPriority()
//work on toggle.
//if need to print only red hide all the not necessary and edit the button.
//if press bake show all again and bake to normal
    {
        document.getElementById('toHide').classList.toggle('d-none');
        document.getElementById('sortByAB').classList.toggle('d-none');
        document.getElementById('sortByPriority').classList.toggle('d-none');

        let temp = document.getElementById('btn_highPriority');
        if (boolHighPriority) {
            temp.innerText = "Show High Priority"
            boolHighPriority = false;
        } else {
            temp.innerText = "bake"
            boolHighPriority = true;
        }
        let list = document.getElementsByClassName("not_red")
        for (let l of list) {
            l.classList.toggle('d-none');
        }
    }
}