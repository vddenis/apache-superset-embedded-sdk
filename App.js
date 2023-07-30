import logo from './logo.svg';
import './App.css';
import { embedDashboard } from "@superset-ui/embedded-sdk";

embedDashboard({
  id: "id....", // given by the Superset embedding UI
  supersetDomain: "https://....",
  mountPoint: document.getElementById("my-superset-container"), // any html element that can contain an iframe
  fetchGuestToken: () => fetchGuestTokenFromBackend(),
  dashboardUiConfig: { // dashboard UI config: hideTitle, hideTab, hideChartControls, filters.visible, filters.expanded (optional)
      hideTitle: true,
      filters: { 
          expanded: true,
      }
  },
  dashboardLayout: "fullscreen",
});

function fetchAccessTokenFromBackend(){ 
	return new Promise(resolve=>{ 

		var req = new XMLHttpRequest();
		var reqtext="https://..../api/v1/security/login"
		var body='{\"password\":\"password\",\"provider\":\"db\",\"refresh\":true,\"username\":\"username\"}';
		req.open("POST", reqtext, true);

		//Send the proper header information along with the request
		req.setRequestHeader("Content-Type", "application/json");
		req.setRequestHeader("accept", "application/json");
		req.onreadystatechange = function() {// Call a function when the state changes.
			if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
				console.log(1,"status "+this.status)
				resolve(req.responseText)
			}
		}
		req.send(body);

	})
}
async function fetchGuestTokenFromBackend(){
	var login_token_string=await fetchAccessTokenFromBackend();
	var login_token_json=JSON.parse(login_token_string)
	var access_token=login_token_json.access_token

	return new Promise(resolve=>{

		var req = new XMLHttpRequest();
		var reqtext="https://..../api/v1/security/guest_token/"
		var body={
			"resources": [
				{
					"id": "id....",
					"type":"dashboard"
				}
			],
			"rls":[],
			"user": {
				"first_name":"FNAME",
				"last_name":"LNAME",
				"username":"username"
			} 
		};
		body=JSON.stringify(body);
		
		req.open("POST", reqtext, true);

		//Send the proper header information along with the request
		req.setRequestHeader("Content-Type", "application/json");
		req.setRequestHeader("accept", "application/json");
		req.setRequestHeader('Authorization', 'Bearer ' + access_token);
		req.onreadystatechange = function() {// Call a function when the state changes.
			if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
				console.log("status "+this.status) 
				var tmp=JSON.parse(req.responseText)
				resolve(tmp.token) 
			}
		}
		req.send(body);

	})
}

function App() {
  return (
    <div className="App">
    <div id="my-superset-container"></div>
    </div>
  );
}

export default App;
