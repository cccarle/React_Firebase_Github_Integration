(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{151:function(t,e){},163:function(t,e,n){t.exports=n(352)},352:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),r=n(31),i=n.n(r),c=n(12),s=n(13),l=n(15),u=n(14),h=n(16),p=n(354),f=n(355),d=n(356),g=n(148),m=n.n(g)()(),b=n(21),O=n(35),v=n(150),y=n(17),E={isAuthenticated:!1},w={profileAvatar:"",profileName:"",githubURL:""},k={weburl:""},j={},I={},N={showNotifications:!1,showRepositories:!0,showOrganization:!1},A=n(151),S=n.n(A),_=Object(O.c)({auth:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E;switch((arguments.length>1?arguments[1]:void 0).type){case"LOGGED_IN_SUCCESS":return Object(y.a)({},t,{isAuthenticated:!0});case"SIGN_OUT":return Object(y.a)({},t,{isAuthenticated:!1});default:return t}},profile:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"GET_USER_PROFILE_DATA":return Object(y.a)({},t,{profileAvatar:e.payload.avatar_url,profileName:e.payload.name,githubURL:e.payload.url});default:return t}},repos:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"GET_REPOS_DATA":return e.payload;case"UPDATE_REPOS_DATA_WITH_HOOK_URL":return Object(y.a)({},t,{weburl:e.payload});default:return t}},orgs:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"GET_ORGS_DATA":case"GET_REPOS_IN_ORGS":return e.payload;default:return t}},notification:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"FETCH_NOTIFICATIONS":return e.payload;default:return t}},toggel:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SHOW_NOTIFICATIONS":return Object(y.a)({},t,{showNotifications:e.payload});case"SHOW_REPOSITORIES":return Object(y.a)({},t,{showRepositories:e.payload});case"SHOW_ORGANIZATION":return Object(y.a)({},t,{showOrganization:e.payload});default:return t}},notificationButtons:S.a}),C=[v.a],T=Object(O.e)(_,{},Object(O.d)(O.a.apply(void 0,C))),R=n(69),D=R.initializeApp({apiKey:"AIzaSyBr2zjlkIdRl2TwTN2OOsA85AW8NeHBI2k",authDomain:"guthubdashboard.firebaseapp.com",databaseURL:"https://guthubdashboard.firebaseio.com",projectId:"guthubdashboard",storageBucket:"guthubdashboard.appspot.com",messagingSenderId:"259327836521"}),G=function(){return function(t){D.auth().onAuthStateChanged(function(e){e?(t({type:"LOGGED_IN_SUCCESS",payload:!0}),m.push("/dashboard")):t({type:"SIGN_OUT",payload:!1})})}},W=function(){return function(t){var e=[],n=window.localStorage.getItem("token");window.fetch("https://api.github.com/user/repos",{headers:{Authorization:"token "+n}}).then(function(t){return t.json()}).then(function(n){for(var a=Object.keys(n),o=0;o<a.length;o++){var r=a[o],i=n[r].name,c=n[r].hooks_url,s=n[r].url,l=n[r].owner.login,u=n[r].id,h=n[r].permissions.admin,p={name:"",hooks_url:"",url:"",owner:"",id:"",admin:"",active:!1};p.name=i,p.hooks_url=c,p.url=s,p.owner=l,p.id=u,p.admin=h,p.active=!1,e.push(p)}var f=e.filter(function(t){return!0===t.admin});t({type:"GET_REPOS_DATA",payload:f})})}},x=(D.firestore(),function(t){return function(e){var n=window.localStorage.getItem("token"),a=D.auth().currentUser,o={url:"https://us-central1-guthubdashboard.cloudfunctions.net/events?id=".concat(a.uid),content_type:"json"};console.log(t);var r={events:["issues","push"],name:"web",config:o};window.fetch(t,{method:"POST",body:JSON.stringify(r),headers:{Authorization:"token "+n,"Content-Type":"application/json"}}).then(function(t){return t.json()}).then(function(t){e({type:"ADD_WEBHOOK",payload:t}),console.log(t)}).catch(function(t){console.log(t)})}}),U=D.messaging(),L=(D.firestore(),function(){var t=[];return function(e){U.onMessage(function(n){console.log(n),t.push(n),e({type:"FETCH_NOTIFICATIONS",payload:t})})}}),H=n(25),P=n(18),F=n.n(P),z=n(33),B=n.n(z),K={containerStyle:{marginTop:"20%",textAlign:"center",width:"100%"},root:{width:"100%",maxWidth:500},text:{fontSize:100,color:"black",textAlign:"center"}},M=function(t){function e(){var t,n;Object(c.a)(this,e);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(o)))).signInAttempt=function(){n.props.signInUser()},n}return Object(h.a)(e,t),Object(s.a)(e,[{key:"componentDidMount",value:function(){this.props.checkIfUserIsLoggedIn()}},{key:"render",value:function(){var t=this.props.classes;return o.a.createElement("div",{className:t.containerStyle},o.a.createElement(B.a,{component:"h2",variant:"h2",gutterBottom:!0},"Welcome To Guthub Dashboard"),o.a.createElement("div",null,o.a.createElement(F.a,{onClick:this.signInAttempt,color:"primary",size:"large",variant:"outlined"},"Log in"," ")))}}]),e}(o.a.Component),J=Object(b.b)(null,{signInUser:function(t){return function(t){var e=new R.auth.GithubAuthProvider;e.addScope("user"),e.addScope("repo"),D.auth().signInWithPopup(e).then(function(e){t({type:"LOGGED_IN_SUCCESS",payload:!0});var n=e.credential.accessToken;window.localStorage.setItem("token",n),m.push("/dashboard")}).catch(function(t){var e=t.errorCode,n=t.errorMessage;console.log("Something went wrong please check your credentials or try again. error message : ".concat(n," - ").concat(e))})}},checkIfUserIsLoggedIn:G})(Object(H.withStyles)(K)(M)),Z=n(34),q=n.n(Z),V=n(158),Q=n.n(V),X=n(159),Y=n.n(X),$=n(68),tt=n(157),et=n.n(tt),nt=n(71),at=n.n(nt),ot=n(72),rt=n.n(ot),it=n(155),ct=n.n(it),st=n(74),lt=n.n(st),ut=n(156),ht=n.n(ut),pt=n(73),ft=n.n(pt),dt=n(153),gt=n.n(dt),mt=n(154),bt=n.n(mt),Ot=n(152),vt=n.n(Ot),yt=n(70),Et=n.n(yt),wt=function(t){return{card:{maxWidth:400},media:{height:0,paddingTop:"56.25%"},actions:{display:"flex"},expand:{transform:"rotate(0deg)",marginLeft:"auto",transition:t.transitions.create("transform",{duration:t.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"},avatar:{backgroundColor:"#6699CC",fontSize:"12"}}},kt=function(t){function e(){var t,n;Object(c.a)(this,e);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(r)))).renderImage=function(t,e){if(!(t.length<1))return o.a.createElement(vt.a,{className:e.media,image:t})},n}return Object(h.a)(e,t),Object(s.a)(e,[{key:"componentDidMount",value:function(){this.props.fetchUserDataFromGithubAPI()}},{key:"render",value:function(){var t=this.props.classes;return o.a.createElement(gt.a,{className:t.card},o.a.createElement(bt.a,{avatar:o.a.createElement(Et.a,{"aria-label":"Recipe",className:t.avatar},this.props.profileName.charAt(0)),title:this.props.profileName}),this.renderImage(this.props.profileAvatar,t))}}]),e}(o.a.Component),jt=Object(b.b)(function(t){var e=t.profile;return{profileAvatar:e.profileAvatar,profileName:e.profileName,githubURL:e.githubURL}},{fetchUserDataFromGithubAPI:function(){return function(t){var e=window.localStorage.getItem("token");window.fetch("https://api.github.com/user",{headers:{Authorization:"token "+e}}).then(function(t){return t.json()}).then(function(e){t({type:"GET_USER_PROFILE_DATA",payload:e})})}}})(Object(H.withStyles)(wt)(kt)),It=function(t){function e(){var t,n;Object(c.a)(this,e);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(o)))).state={top:!1,left:!1,bottom:!1,right:!1},n.toggleDrawer=function(t,e){return function(){n.setState(Object($.a)({},t,e))}},n}return Object(h.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){var t=this.props.classes,e=o.a.createElement("div",{className:t.list},o.a.createElement(at.a,null,o.a.createElement(jt,null),["Inbox","Subscription","Notifications","Sign Out"].map(function(t,e){return o.a.createElement(rt.a,{button:!0,key:t},o.a.createElement(ct.a,null,e%2===0?o.a.createElement(ht.a,null):o.a.createElement(ft.a,null)),o.a.createElement(lt.a,{primary:t}))})));return o.a.createElement("div",null,o.a.createElement(F.a,{className:t.ButtonColor,onClick:this.toggleDrawer("left",!0)},"profile"),o.a.createElement(et.a,{open:this.state.left,onClose:this.toggleDrawer("left",!1)},o.a.createElement("div",{tabIndex:0,role:"button",onClick:this.toggleDrawer("left",!1),onKeyDown:this.toggleDrawer("left",!1)},e)))}}]),e}(o.a.Component),Nt=Object(H.withStyles)({list:{width:250},fullList:{width:"auto"},ButtonColor:{color:"#FFFFFF"}})(It),At={root:{flexGrow:1},grow:{flexGrow:1,width:450},menuButton:{marginLeft:-12,marginRight:20},ButtonContainer:{textAlign:"right"},navbarColor:{backgroundColor:"#98c1d9"}},St=n(160),_t=n.n(St),Ct=function(t){function e(){var t,n;Object(c.a)(this,e);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(o)))).signOutAttempt=function(){n.props.signOutUser()},n.toggelNotification=function(){n.props.showNotification()},n.toggelRepositories=function(){n.props.showRepositories()},n.toggelOrganizations=function(){n.props.showOrganizations()},n}return Object(h.a)(e,t),Object(s.a)(e,[{key:"componentWillMount",value:function(){this.props.fetchNotifications()}},{key:"render",value:function(){var t=this.props.classes;return o.a.createElement("div",{className:t.root},o.a.createElement(Q.a,{color:"primary",className:t.navbarColor,position:"static"},o.a.createElement(Y.a,null,o.a.createElement("div",null,o.a.createElement(B.a,{className:t.grow,variant:"h6",color:"inherit"},"Github Dashboard")),o.a.createElement(Nt,null),o.a.createElement("div",{className:t.ButtonContainer},o.a.createElement(F.a,{onClick:this.toggelOrganizations,color:"inherit"},"Organizations"),o.a.createElement(F.a,{onClick:this.toggelRepositories,color:"inherit"},"Repositories"),o.a.createElement(F.a,{onClick:this.signOutAttempt,color:"inherit"},"Sign out"),o.a.createElement(_t.a,{className:t.margin,onClick:this.toggelNotification,badgeContent:this.props.notifications.length,color:"secondary"},o.a.createElement(ft.a,null))))))}}]),e}(a.Component),Tt=Object(b.b)(function(t){return{notifications:q.a.map(t.notification,function(t){return Object(y.a)({},t)})}},{signOutUser:function(t){return function(t){D.auth().signOut().then(function(){t({type:"SIGN_OUT",payload:!1}),console.log("sign out succesfull"),m.push("/")}).catch(function(t){console.log("error accurred"+t)})}},showRepositories:function(){return function(t){t({type:"SHOW_REPOSITORIES",payload:!0}),t({type:"SHOW_NOTIFICATIONS",payload:!1})}},showNotification:function(){return function(t){t({type:"SHOW_NOTIFICATIONS",payload:!0})}},showOrganizations:function(){return function(t){t({type:"SHOW_REPOSITORIES",payload:!1}),t({type:"SHOW_NOTIFICATIONS",payload:!1}),t({type:"SHOW_ORGANIZATION",payload:!0})}},fetchNotifications:L})(Object(H.withStyles)(At)(Ct)),Rt=n(75),Dt=n.n(Rt),Gt=n(76),Wt=n.n(Gt),xt=n(47),Ut=n.n(xt),Lt=n(78),Ht=n.n(Lt),Pt=n(77),Ft=n.n(Pt),zt={root:{display:"flex",flexWrap:"wrap",justifyContent:"center",overflow:"hidden"},gridList:{width:800,height:750},button:{backgroundColor:"#FFF",marginRight:20},headerText:{textAlign:"center"}},Bt=function(t){function e(){var t,n;Object(c.a)(this,e);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(r)))).addWebHooks=function(t){n.props.addWebhook(t)},n.turnOffNotification=function(t){n.props.turnOffNotifications(t)},n.turnOnNotification=function(t){n.props.turnOnNotifications(t)},n.renderButton=function(t,e){return!1===t.active?o.a.createElement(F.a,{onClick:function(){return n.turnOffNotification(t.hookURLDelete)},variant:"contained",className:e.button},"Turn off notifications"):!1===t.active?o.a.createElement(F.a,{onClick:function(){return n.turnOnNotification(t.hookURLDelete)},variant:"outlined",className:e.button},"Turn on notifications"):void 0},n}return Object(h.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){var t=this,e=this.props.classes;return console.log(this.props.repos),o.a.createElement("div",{className:e.root},o.a.createElement(Wt.a,{cellHeight:180,className:e.gridList},o.a.createElement(Ut.a,{key:"header",cols:2,style:{height:"auto"}},o.a.createElement(Ft.a,{className:e.headerText,component:"div"},"Github Repositories")),this.props.repos.map(function(n){return o.a.createElement(Ut.a,{key:n.id},o.a.createElement("img",{src:Dt.a,alt:n.name}),o.a.createElement(Ht.a,{title:n.name,subtitle:o.a.createElement("span",null,"by: ",n.owner),actionIcon:o.a.createElement(F.a,{onClick:function(){return t.addWebHooks(n.hooks_url)},variant:"contained",className:e.button},"Sybscribe"," ")}))})))}}]),e}(o.a.Component),Kt=Object(b.b)(function(t){return{repos:q.a.map(t.repos,function(t){return Object(y.a)({},t)})}},{fetchReposDataGithubAPI:W,addWebhook:x,turnOffNotifications:function(t){return function(e){var n=window.localStorage.getItem("token");console.log(t);var a={active:!1,config:{url:"https://us-central1-guthubdashboard.cloudfunctions.net/events",content_type:"json"}};window.fetch(t,{method:"PATCH",body:JSON.stringify(a),headers:{Authorization:"token "+n,"Content-Type":"application/json"}}).then(function(t){return t.json()}).then(function(t){e({type:"DELETE_WEBHOOK",payload:t})}).catch(function(t){console.log(t)})}},turnOnNotifications:function(t){return function(e){var n=window.localStorage.getItem("token");console.log(t);var a={active:!0,config:{url:"https://us-central1-guthubdashboard.cloudfunctions.net/events",content_type:"json"}};window.fetch(t,{method:"PATCH",body:JSON.stringify(a),headers:{Authorization:"token "+n,"Content-Type":"application/json"}}).then(function(t){return t.json()}).then(function(t){console.log(t),e({type:"DELETE_WEBHOOK",payload:t})}).catch(function(t){console.log(t)})}}})(Object(H.withStyles)(zt)(Bt)),Mt={root:{display:"flex",flexWrap:"wrap",justifyContent:"center",overflow:"hidden"},gridList:{width:800,height:750},button:{backgroundColor:"#FFF",marginRight:20},backButton:{backgroundColor:"#6699CC",marginRight:20},headerText:{textAlign:"center"}},Jt=function(t){function e(){var t,n;Object(c.a)(this,e);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(r)))).addWebHooks=function(t){var e=t;n.props.fetchReposInOrg(e)},n.addWebHOOK=function(t){n.props.addWebhook(t)},n.renderOrgs=function(){n.props.fetchOrgsDataGithubAPI()},n.checkIfAdmin=function(t,e){return!1===t.admin||t.repos_url?o.a.createElement("div",null,o.a.createElement(F.a,{onClick:function(){return n.addWebHooks(t.name)},variant:"contained",className:e.button},"View"),o.a.createElement(F.a,{onClick:function(){return n.addWebHOOK(t.hooks_url)},variant:"contained",className:e.button},"webhook")):o.a.createElement(F.a,{variant:"contained",className:e.button},"Not admin")},n.checkIfAvatar=function(t){return void 0===t?Dt.a:t},n}return Object(h.a)(e,t),Object(s.a)(e,[{key:"componentDidMount",value:function(){this.props.fetchOrgsDataGithubAPI()}},{key:"render",value:function(){var t=this,e=this.props.classes;return o.a.createElement("div",{className:e.root},o.a.createElement(Wt.a,{cellHeight:180,className:e.gridList},o.a.createElement(Ut.a,{key:"header",cols:2,style:{height:"auto"}},o.a.createElement(Ft.a,{className:e.headerText,component:"div"},"Github Organizations")),this.props.orgs.map(function(n){return o.a.createElement(Ut.a,{key:n.name},o.a.createElement("img",{src:t.checkIfAvatar(n.avatar_url),alt:"avatar"}),o.a.createElement(Ht.a,{title:n.name,key:n.name,subtitle:o.a.createElement("span",null," ",n.url),actionIcon:t.checkIfAdmin(n,e)}))}),o.a.createElement(F.a,{onClick:function(){return t.renderOrgs()},variant:"contained",className:e.backButton},"Back")))}}]),e}(o.a.Component),Zt=Object(b.b)(function(t){return{orgs:q.a.map(t.orgs,function(t){return Object(y.a)({},t)})}},{fetchReposDataGithubAPI:W,addWebhook:x,fetchOrgsDataGithubAPI:function(){return function(t){var e=[],n=window.localStorage.getItem("token");window.fetch("https://api.github.com/user/orgs",{headers:{Authorization:"token "+n}}).then(function(t){return t.json()}).then(function(n){var a=Object.keys(n);console.log(n);for(var o=0;o<a.length;o++){var r=a[o],i=n[r].avatar_url,c=n[r].hooks_url,s=n[r].id,l=n[r].login,u=n[r].url,h=n[r].url,p={avatar_url:"",hooks_url:"",id:"",url:"",name:"",repos_url:""};p.avatar_url=i,p.hooks_url=c,p.id=s,p.name=l,p.url=u,p.repos_url=h,e.push(p)}t({type:"GET_ORGS_DATA",payload:e})})}},fetchReposInOrg:function(t){return function(e){var n=[];window.fetch("https://api.github.com/orgs/".concat(t,"/repos")).then(function(t){return t.json()}).then(function(t){for(var a=Object.keys(t),o=0;o<a.length;o++){var r=a[o],i=t[r].name,c=t[r].hooks_url,s=t[r].url,l=t[r].owner.login,u=t[r].id,h=t[r].permissions.admin,p={name:"",hooks_url:"",url:"",owner:"",id:"",admin:h};p.name=i,p.hooks_url=c,p.url=s,p.owner=l,p.id=u,p.admin=h,n.push(p)}e({type:"GET_REPOS_IN_ORGS",payload:n})})}}})(Object(H.withStyles)(Mt)(Jt)),qt=n(161),Vt=n.n(qt),Qt=function(t){function e(){var t,n;Object(c.a)(this,e);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(r)))).renderIfNotification=function(t){return 0===t.length?o.a.createElement(B.a,{variant:"overline",gutterBottom:!0},"No new notifications"):o.a.createElement("div",null,n.props.notifications.map(function(t){return o.a.createElement(at.a,{key:t.eventURL},o.a.createElement(rt.a,null,o.a.createElement(Et.a,null,o.a.createElement(Vt.a,null)),o.a.createElement(lt.a,{primary:t.notification.title,secondary:t.notification.body})))}),o.a.createElement(F.a,{color:"outlined"},"clear notifications"))},n}return Object(h.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){var t=this.props.classes;return o.a.createElement("div",{className:t.root},this.renderIfNotification(this.props.notifications))}}]),e}(o.a.Component),Xt=Object(b.b)(function(t){return{notifications:q.a.map(t.notification,function(t){return Object(y.a)({},t)})}},{})(Object(H.withStyles)(function(t){return{root:{maxWidth:360,marginTop:"3%",margin:"auto",width:"50\u2030",textAlign:"center",backgroundColor:t.palette.background.paper},Button:{marginTop:10,marginRight:110}}})(Qt)),Yt=D.firestore(),$t=function(t){function e(){var t,n;Object(c.a)(this,e);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(r)))).renderRepoOrNotificatin=function(){return!0===n.props.toggel.showNotifications?o.a.createElement(Xt,null):!0===n.props.toggel.showRepositories?o.a.createElement(Kt,null):!0===n.props.toggel.showOrganization?o.a.createElement(Zt,null):void 0},n}return Object(h.a)(e,t),Object(s.a)(e,[{key:"componentDidMount",value:function(){this.props.checkIfUserIsLoggedIn(),this.props.fetchNotifications(),this.props.fetchReposDataGithubAPI();var t=D.messaging();t.requestPermission().then(function(){return console.log("have permission"),t.getToken()}).then(function(t){var e=D.auth().currentUser;Yt.collection("users").doc(e.providerData[0].uid).set({msgToken:t},{merge:!0})}).catch(function(t){console.log(t)})}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(Tt,null),this.renderRepoOrNotificatin())}}]),e}(a.Component),te=Object(b.b)(function(t){return t},{checkIfUserIsLoggedIn:G,fetchNotifications:L,fetchReposDataGithubAPI:W,checkIfWebhookIsRegistered:function(){return function(t){var e=W();console.log(e),window.localStorage.getItem("token")}}})($t),ee=function(t){function e(){return Object(c.a)(this,e),Object(l.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("p",null,"Page Not FOund "))}}]),e}(a.Component),ne=function(t){function e(){return Object(c.a)(this,e),Object(l.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){return o.a.createElement(b.a,{store:T},o.a.createElement(p.a,{history:m},o.a.createElement("div",null,o.a.createElement(f.a,null,o.a.createElement(d.a,{exact:!0,path:"/",component:J}),o.a.createElement(d.a,{exact:!0,path:"/dashboard",component:te}),o.a.createElement(d.a,{component:ee})))))}}]),e}(a.Component);"serviceWorker"in navigator&&navigator.serviceWorker.register("../firebase-messaging-sw.js").then(function(t){console.log("Registration successful, scope is:",t.scope)}).catch(function(t){console.log("Service worker registration failed, error:",t)}),i.a.render(o.a.createElement(ne,null),document.getElementById("root"))},75:function(t,e,n){t.exports=n.p+"static/media/examplepic.2bf7cacd.jpg"}},[[163,2,1]]]);
//# sourceMappingURL=main.5b8f784c.chunk.js.map