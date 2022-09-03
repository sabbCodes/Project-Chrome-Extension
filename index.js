let savedLeads = [];
const saveBtn = document.getElementById("save-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const inputEl = document.getElementById("input-field");
const outputEl = document.getElementById("output-field");
const leadsBtn = document.getElementById("leads-btn");
const prevLeads = JSON.parse( localStorage.getItem("savedLeads") );

saveBtn.addEventListener("click", function(){
    savedLeads.push(inputEl.value);
    inputEl.value = "";
    render(savedLeads);
    localStorage.setItem("savedLeads", JSON.stringify(savedLeads));
})

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        savedLeads.push(tabs[0].url);
        localStorage.setItem("savedLeads", JSON.stringify(savedLeads));
        render(savedLeads);
    })
})

leadsBtn.addEventListener("click", function(){
    if (prevLeads){
        savedLeads = prevLeads;
        render(savedLeads);
    }
})

deleteBtn.addEventListener("click", function(){
    localStorage.clear("savedLeads");
    outputEl.innerHTML = "";
    document.location.reload();
})

function render(leads){
    let displayedLead = "";
    for (let i = 0; i < leads.length; i++){
        displayedLead += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
    `
    outputEl.innerHTML = displayedLead
    }
}