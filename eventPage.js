chrome.runtime.onInstalled.addListener(()=>{
    chrome.contextMenus.create({
        id:"spendMoney",
        title:"SpendMoney",
        contexts:["selection"]
    })
})

function isInt(val) {
    return Number.isInteger(Number(val.trim()));
}
// chrome.contextMenus.onClicked.addListener((clickData) =>{
//     console.log("Context menu clicked", clickData);
//     if(clickData.menuItemId == "spendMoney"  && clickData.selectionText){
//         if(isInt(clickData.selectionText)){
//             chrome.storage.sync.get(['total', 'limit'], (budget)=>{
//                 let newTotal = budget.total ? parseInt(budget.total) :0;
//                 newTotal += parseInt(clickData.selectionText, 10);
//                 chrome.storage.sync.set({'total': newTotal}, ()=>{
//                     if(budget.limit && newTotal >= budget.limit){
//                         chrome.notifications.create({
//                         type:'basic',
//                         iconUrl:'images/icon-48.png',
//                         title:'Limit Reached!',
//                         message: "Looks like you've reached the limit"
//                     })
//                     }
//                 })

//         })

//         }
//     }
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "spendMoney") return;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.getSelection().toString()
  }, (results) => {

    const selectedText = results?.[0]?.result;
    if (!selectedText) return;

    const value = parseInt(selectedText.replace(/[^\d]/g, ""), 10);
    if (isNaN(value)) return;

    chrome.storage.sync.get(["total", "limit"], (data) => {
      const newTotal = (data.total || 0) + value;

      chrome.storage.sync.set({ total: newTotal }, () => {
        if (data.limit && newTotal >= data.limit) {
          chrome.notifications.create({
            type: "basic",
            iconUrl: "images/icon-48.png",
            title: "Limit Reached!",
            message: "Looks like you've reached the limit"
          });
        }
      });
    });
  });
});


chrome.storage.onChanged.addListener((changes, storageName)=>{
    chrome.action.setBadgeText({"text":changes.total.newValue.toString()})

})
