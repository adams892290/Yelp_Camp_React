(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{55:function(e,t,a){"use strict";a.r(t);var c=a(1),s=a.n(c),l=a(25),r=a.n(l),n=a(2),o=a(3),i=a(0);var d=e=>{const{user_id:t,reRender:a}=e;return Object(i.jsx)("div",{children:Object(i.jsx)("header",{className:"mb-auto",children:Object(i.jsxs)("div",{children:[Object(i.jsx)("h3",{className:"float-md-left p-4 d-inline my-card-body",children:"YelpCamp"}),Object(i.jsxs)("nav",{className:"nav nav-masthead justify-content-center float-md-right",children:[Object(i.jsx)(o.b,{className:"nav-link","aria-current":"page",to:"/",children:"Home"}),Object(i.jsx)(o.b,{className:"nav-link",to:"/campground",children:"Campgrounds"}),""===t?Object(i.jsxs)("div",{className:"nav nav-masthead justify-content-center float-md-right",children:[Object(i.jsx)(o.b,{exact:!0,className:"nav-link",to:"/login",children:"Login"}),Object(i.jsx)(o.b,{exact:!0,className:"nav-link",to:"/register",children:"Register"})]}):Object(i.jsxs)("div",{className:"nav nav-masthead justify-content-center float-md-right",children:[Object(i.jsx)(o.b,{exact:!0,className:"nav-link",to:"/campground/new",children:"Add Campground"}),Object(i.jsx)(o.b,{exact:!0,className:"nav-link",onClick:e=>{localStorage.clear(),a()},to:"#",children:"Logout"})]})]})]})})})},m=a(8),j=a.n(m);const b=async e=>{const t={headers:{authorization:e}};return await j.a.get("http://localhost:8000/verifytoken",t)};var u=()=>{const[e,t]=Object(c.useState)("");Object(c.useEffect)((()=>{const e=localStorage.getItem("token");b(e).then((e=>{!e.data.message&&t(e.data.user_id)})).catch((e=>{console.log("Errorr",e)}))}));return Object(i.jsxs)("div",{children:[Object(i.jsx)(d,{user_id:e,reRender:()=>{t("")}}),Object(i.jsx)("div",{className:"cover-container d-flex w-100 h-100 p-3 mx-auto flex-column",children:Object(i.jsxs)("main",{className:"px-3 text-center",children:[Object(i.jsx)("h1",{children:"YelpCamp"}),Object(i.jsxs)("p",{className:"lead",children:[" Welcome to YelpCamp! ",Object(i.jsx)("br",{})," Jump right in and explore our many campgrounds. ",Object(i.jsx)("br",{}),"Feel free to share some of your own and comment on others!"]}),Object(i.jsx)(o.b,{to:"/campground",className:"btn btn-lg btn-secondary font-weight-bold border-white bg-white",children:"View Campgrounds"})]})})]})};const g=e=>{const{title:t,location:a,_id:c,image:s}=e.campground;return Object(i.jsx)("div",{className:"my-card mb-3",styles:"max-width: 540px;",children:Object(i.jsxs)("div",{className:"row",children:[Object(i.jsx)("div",{className:"col-md-4",children:Object(i.jsx)("img",{src:s[0],alt:"...",className:"my-card-quick-image"})}),Object(i.jsxs)("div",{className:"col-md-8",children:[Object(i.jsxs)("div",{className:"mx-2 my-card-body",children:[Object(i.jsx)("h5",{className:"mx-2 ",children:t}),Object(i.jsx)("p",{className:"mx-2",children:a})]}),Object(i.jsx)(o.b,{className:"btn mx-3 my-card-btn",exact:!0,to:`/campground/${c}`,children:"View"})]})]})})};var h=()=>{const[e,t]=Object(c.useState)([]),[a,s]=Object(c.useState)("");Object(c.useEffect)((()=>{const e=localStorage.getItem("token");console.log(e),(async e=>{const t={headers:{authorization:e}};return await j.a.get("http://localhost:8000/campground",t)})(e).then((e=>{null===e.data.user_id?localStorage.clear():(localStorage.clear(),localStorage.setItem("token",e.data.token),s(e.data.user_id)),t(e.data.allCampgrounds)})).catch((e=>{console.log("Errorrrr",e)}))}),[]);return Object(i.jsxs)("div",{children:[Object(i.jsx)(d,{user_id:a,reRender:()=>{s("")}}),e.length>0?null:Object(i.jsx)("h4",{className:"my-card-body d-flex flex-column align-items-center mt-5 pt-5",children:"No campgrounds to show yet."}),e.map((e=>Object(i.jsx)("div",{className:"row",children:Object(i.jsx)("div",{className:"col-6 offset-3",children:Object(i.jsx)(g,{campground:e})})},e._id)))]})};var p=()=>{const[e,t]=Object(c.useState)(""),[a,s]=Object(c.useState)(""),[l,r]=Object(c.useState)(""),[o,m]=Object(c.useState)([]),[u,g]=Object(c.useState)(!1),[h,p]=Object(c.useState)(""),[x,O]=Object(c.useState)(!1),v=Object(n.g)();Object(c.useEffect)((()=>{const e=localStorage.getItem("token");b(e).then((e=>{e.data.message?(localStorage.clear(),f()):(O(!0),localStorage.clear(),localStorage.setItem("token",e.data.token),p(e.data.user_id),document.getElementById("alert-info").style.display="none")})).catch((e=>{console.log("Errorr",e)}))}),[]);const y=e=>{"location"===e.target.name?s(e.target.value):"title"===e.target.name?t(e.target.value):"description"===e.target.name?r(e.target.value):"image"===e.target.name&&m(e.target.files)},f=()=>{setTimeout((()=>{v.goBack()}),5e3)};return Object(i.jsxs)("div",{children:[u?Object(i.jsx)(n.a,{to:"/campground"}):null,x?Object(i.jsxs)("div",{className:"row",children:[Object(i.jsx)(d,{user_id:h,reRender:()=>{p("")}}),Object(i.jsxs)("div",{className:"col-6 offset-3",children:[Object(i.jsx)("div",{className:"alert alert-info alert-dismissible fade show",role:"alert",id:"alert-info",children:Object(i.jsx)("span",{id:"info-message"})}),Object(i.jsxs)("form",{onSubmit:t=>{t.preventDefault();const c=localStorage.getItem("token");e.length>0&&l.length>0&&a.length>0&&o.length>0&&(document.getElementById("alert-info").style.display="block",document.getElementById("alert-info").innerText="Please wait while your campground is being created :)",(async(e,t)=>{const a=new FormData;a.append("title",e.title),a.append("location",e.location),a.append("description",e.description);for(let s=0;s<e.image.length;s++)a.append("image",e.image[s]);const c={headers:{authorization:t}};return await j.a.post("http://localhost:8000/campground",a,c)})({title:e,location:a,description:l,image:o},c).then((e=>{document.getElementById("alert-info").style.display="none",e.data.message?(O(!1),p(""),localStorage.clear(),f()):(localStorage.clear(),localStorage.setItem("token",e.data.token),g(!0))})).catch((e=>{console.log("Errorrrr",e)})))},children:[Object(i.jsx)("label",{htmlFor:"title",className:"form-label",children:"Title"}),Object(i.jsx)("input",{type:"text",name:"title",id:"title",className:"form-control",onChange:y,placeholder:"title",required:!0}),Object(i.jsx)("label",{htmlFor:"location",className:"form-label",children:"Location"}),Object(i.jsx)("input",{type:"text",name:"location",id:"location",className:"form-control",onChange:y,placeholder:"location",required:!0}),Object(i.jsx)("label",{htmlFor:"description",className:"form-label",children:"Description"}),Object(i.jsx)("input",{type:"text",name:"description",id:"description",className:"form-control",onChange:y,placeholder:"description",required:!0}),Object(i.jsx)("label",{htmlFor:"image",className:"form-label",children:"Image"}),Object(i.jsx)("input",{multiple:!0,type:"file",name:"image",id:"image",className:"form-control",onChange:y,placeholder:"image",required:!0}),Object(i.jsx)("button",{className:"btn my-card-btn-success mt-3 mx-2",children:"Submit"})]})]})]}):Object(i.jsx)("div",{className:"row",children:Object(i.jsxs)("div",{className:"col-6 offset-3 d-flex flex-column align-items-center mt-5",children:[Object(i.jsx)("div",{className:"loader"}),Object(i.jsx)("span",{className:"my-card-body",children:"Access Denied :(, You will be redirected back in 5 seconds"})]})})]})};var x=()=>{const{id:e}=Object(n.h)(),[t,a]=Object(c.useState)({}),[s,l]=Object(c.useState)([]),[r,m]=Object(c.useState)([]),[b,u]=Object(c.useState)({review:"",rating:1}),[g,h]=Object(c.useState)(!1),[p,x]=Object(c.useState)(!1),[O,v]=Object(c.useState)("");Object(c.useEffect)((()=>{const t=localStorage.getItem("token");(async(e,t)=>{const a={headers:{authorization:t}};return await j.a.get(`http://localhost:8000/campground/${e}`,a)})(e,t).then((e=>{null===e.data.user_id?localStorage.clear():(localStorage.clear(),localStorage.setItem("token",e.data.token),v(e.data.user_id)),a(e.data.foundCampground),l(e.data.foundReviews),m(e.data.foundCampground.image.map(((e,t)=>0===t?Object(i.jsx)("div",{className:"carousel-item active",children:Object(i.jsx)("img",{src:e,className:"d-block w-100 my-carasoul-image",alt:"..."})}):Object(i.jsx)("div",{className:"carousel-item my-carasoul-image",children:Object(i.jsx)("img",{src:e,className:"d-block w-100",alt:"..."})})))),document.getElementById("first-rate1").setAttribute("checked","true"),document.getElementById("alert-success").style.display="none",document.getElementById("alert-danger").style.display="none"})).catch((e=>{console.log("Errorrrr",e)})),document.getElementById("editReview").style.display="none"}),[]);const y=e=>{"rating"===e.target.name?(u({rating:e.target.value,review:b.review}),document.getElementById(`first-rate${e.target.value}`).setAttribute("checked","true")):"review"===e.target.name&&u({review:e.target.value,rating:b.rating})},f=e=>{const t=s.filter((t=>t._id===e.target.value));u(t[0]),document.getElementById("editReview").value=e.target.value,document.getElementById("editReview").style.display="block",document.getElementById("addReview").style.display="none"},N=t=>{const a=localStorage.getItem("token");(async(e,t,a)=>{const c={headers:{authorization:a}};return await j.a.delete(`http://localhost:8000/campground/${e}/review/${t}`,c)})(e,t.target.value,a).then((e=>{e.data.message?togglePopup():(localStorage.clear(),localStorage.setItem("token",e.data.token),l(s.filter((e=>e._id!==t.target.value))))})).catch((e=>{console.log("Erorrr",e)}))},w=()=>{setTimeout((()=>{document.getElementById("alert-danger").style.display="none",document.getElementById("alert-success").style.display="none"}),5e3)};return Object(i.jsxs)("div",{children:[Object(i.jsx)(d,{user_id:O,reRender:()=>{v("")}}),Object(i.jsxs)("div",{className:"row my-3",children:[g?Object(i.jsx)(n.a,{to:"/campground"}):null,p?Object(i.jsx)(n.a,{to:"/login"}):null,Object(i.jsxs)("div",{className:"col-4 offset-2",children:[Object(i.jsx)("div",{className:"alert alert-danger alert-dismissible fade show",role:"alert",id:"alert-danger",children:Object(i.jsx)("span",{id:"danger-message"})}),Object(i.jsx)("div",{className:"alert alert-success alert-dismissible fade show",role:"alert",id:"alert-success",children:Object(i.jsx)("span",{id:"success-message"})}),Object(i.jsx)("div",{id:"carouselExampleSlidesOnly",className:"carousel slide","data-bs-ride":"carousel",children:Object(i.jsx)("div",{className:"carousel-inner",children:r})}),Object(i.jsx)("div",{className:"my-card",styles:"width: 18rem;",children:Object(i.jsxs)("div",{className:"my-card-body mx-2",children:[Object(i.jsx)("h5",{className:"my-card-title",children:t.title}),Object(i.jsx)("p",{children:t.location}),Object(i.jsx)("p",{className:"my-card-text",children:t.description}),O===t.author?Object(i.jsxs)("div",{children:[Object(i.jsx)(o.b,{exact:!0,to:`/campground/edit/${t._id}`,className:"btn my-card-btn",children:"Edit"}),Object(i.jsx)("button",{className:"btn my-card-btn-danger",onClick:e=>{const t=localStorage.getItem("token");(async(e,t)=>{const a={headers:{authorization:t}};return await j.a.delete(`http://localhost:8000/campground/${e}`,a)})(e.target.value,t).then((e=>{e.data.message||(localStorage.clear(),localStorage.setItem("token",e.data.token),h(!0))})).catch((e=>{console.log("Errorrrr",e)}))},value:t._id,children:"Delete"})]}):null]})})]}),Object(i.jsxs)("div",{className:"col-4",children:[Object(i.jsx)("h3",{className:"my-card-body",children:"Add a Review"}),Object(i.jsxs)("form",{onSubmit:e=>{e.preventDefault()},id:"review-form",children:[Object(i.jsxs)("fieldset",{className:"starability-grow",onChange:y,children:[Object(i.jsx)("input",{type:"radio",id:"no-rate",className:"input-no-rate",name:"rating",value:"0","aria-label":"No rating."}),Object(i.jsx)("input",{type:"radio",id:"first-rate1",name:"rating",value:"1"}),Object(i.jsx)("label",{htmlFor:"first-rate1",title:"Terrible",children:"1 star"}),Object(i.jsx)("input",{type:"radio",id:"first-rate2",name:"rating",value:"2"}),Object(i.jsx)("label",{htmlFor:"first-rate2",title:"Not good",children:"2 stars"}),Object(i.jsx)("input",{type:"radio",id:"first-rate3",name:"rating",value:"3"}),Object(i.jsx)("label",{htmlFor:"first-rate3",title:"Average",children:"3 stars"}),Object(i.jsx)("input",{type:"radio",id:"first-rate4",name:"rating",value:"4"}),Object(i.jsx)("label",{htmlFor:"first-rate4",title:"Very good",children:"4 stars"}),Object(i.jsx)("input",{type:"radio",id:"first-rate5",name:"rating",value:"5"}),Object(i.jsx)("label",{htmlFor:"first-rate5",title:"Amazing",children:"5 stars"})]}),Object(i.jsx)("label",{htmlFor:"review",className:"form-label",children:"Review"}),Object(i.jsx)("textarea",{row:"10",cols:"30",required:!0,value:b.review,onChange:y,name:"review",type:"text",id:"review",className:"form-control",placeholder:"review",required:!0}),Object(i.jsx)("button",{className:"btn my-card-btn-success my-2",id:"addReview",onClick:()=>{if(b.rating>0&&b.review.length>0){const t=localStorage.getItem("token");(async(e,t,a)=>{const c=new FormData;c.append("rating",t.rating),c.append("review",t.review);const s={headers:{authorization:a}};return await j.a.post(`http://localhost:8000/campground/${e}/review`,c,s)})(e,b,t).then((e=>{e.data.message?(document.getElementById("alert-danger").style.display="block",document.getElementById("danger-message").innerText="Login to post a review!",w()):(localStorage.clear(),localStorage.setItem("token",e.data.token),u({}),l(s.concat(e.data.newReview)),document.getElementById("review").value="",document.getElementById("alert-success").style.display="block",document.getElementById("success-message").innerText="Review posted!",w())})).catch((e=>{console.log("Erorrr",e)}))}},children:"Submit"}),Object(i.jsx)("button",{className:"btn my-card-btn-info my-2",id:"editReview",onClick:e=>{const t=localStorage.getItem("token");(async(e,t,a)=>{const c=new FormData;c.append("rating",t.rating),c.append("review",t.review);const s={headers:{authorization:a}};return await j.a.patch(`http://localhost:8000/campground/review/${e}`,c,s)})(e.target.value,b,t).then((t=>{t.data.message?(document.getElementById("rating").value="",document.getElementById("review").value="",document.getElementById("alert-danger").style.display="block",document.getElementById("danger-message").innerText="Login to edit the review!",w()):(localStorage.clear(),localStorage.setItem("token",t.data.token),u({}),document.getElementById("rating").value="",document.getElementById("review").value="",l(s.map((a=>a._id===e.target.value?(a.rating=t.data.updatedReview.rating,a.review=t.data.updatedReview.review,a):a))),document.getElementById("alert-success").style.display="block",document.getElementById("success-message").innerText="Review edited!",w())})).catch((e=>{console.log("Erorrrr",e)})),document.getElementById("editReview").style.display="none",document.getElementById("addReview").style.display="block"},children:"Save"})]}),Object(i.jsx)("div",{className:"scroll",children:s.map((e=>Object(i.jsxs)("div",{className:"mt-3 mx-2",styles:"width: 18rem;",children:[Object(i.jsxs)("div",{children:[Object(i.jsx)("p",{className:"my-card-body",children:`Username:${e.author.username}`}),Object(i.jsx)("p",{className:"starability-result","data-rating":e.rating,children:`Rating:${e.rating}`}),Object(i.jsx)("p",{className:"my-card-body",children:`Review:${e.review}`})]}),O===e.author._id?Object(i.jsxs)("div",{children:[Object(i.jsx)("button",{className:"btn my-card-btn mx-1",onClick:f,value:e._id,children:"Edit"}),Object(i.jsx)("button",{className:"btn my-card-btn-danger mx-1",onClick:N,value:e._id,children:"Delete"})]}):null]},e._id)))})]})]})]})};var O=()=>{const{id:e}=Object(n.h)(),[t,a]=Object(c.useState)({}),[s,l]=Object(c.useState)(!1),[r,o]=Object(c.useState)(""),[m,b]=Object(c.useState)(!1),[u,g]=Object(c.useState)(!1),h=Object(n.g)();Object(c.useEffect)((()=>{const t=localStorage.getItem("token");(async(e,t)=>{const a={headers:{authorization:t}};return await j.a.get(`http://localhost:8000/campground/edit/${e}`,a)})(e,t).then((e=>{e.data.message?x():(b(!0),localStorage.clear(),localStorage.setItem("token",e.data.token),o(e.data.user_id),a(e.data.foundCampground))})).catch((e=>{console.log("Errorrrr",e)}))}),[]);const p=e=>{"title"===e.target.name?a({_id:t._id,title:e.target.value,location:t.location,description:t.description}):"location"===e.target.name?a({_id:t._id,title:t.title,location:e.target.value,description:t.description}):"description"===e.target.name&&a({_id:t._id,title:t.title,location:t.location,description:e.target.value})},x=()=>{setTimeout((()=>{h.goBack()}),5e3)};return Object(i.jsxs)("div",{children:[Object(i.jsx)(d,{user_id:r,reRender:()=>{o("")}}),s?Object(i.jsx)(n.a,{to:`/campground/${e}`}):null,m?Object(i.jsx)("div",{className:"row",children:Object(i.jsx)("div",{className:"col-6 offset-3",children:Object(i.jsxs)("form",{onSubmit:e=>{if(e.preventDefault(),t.title.length>0&&t.description.length>0&&t.location.length>0){const e=localStorage.getItem("token");(async(e,t)=>{const a=new FormData;a.append("title",e.title),a.append("location",e.location),a.append("description",e.description);const c={headers:{authorization:t}};return await j.a.patch(`http://localhost:8000/campground/${e._id}`,a,c)})(t,e).then((e=>{e.data.message||(localStorage.clear(),localStorage.setItem("token",e.data.token)),x()})).catch((e=>{console.log("Errorrr",e)}))}},children:[Object(i.jsx)("label",{className:"form-label",htmlFor:"title",children:"Title"}),Object(i.jsx)("input",{className:"form-control",required:!0,value:t.title,type:"text",name:"title",id:"title",onChange:p,placeholder:"title"}),Object(i.jsx)("label",{className:"form-label",htmlFor:"location",children:"Location"}),Object(i.jsx)("input",{className:"form-control",required:!0,value:t.location,type:"text",name:"location",id:"location",onChange:p,placeholder:"location"}),Object(i.jsx)("label",{className:"form-label",htmlFor:"description",children:"Description"}),Object(i.jsx)("input",{className:"form-control",required:!0,value:t.description,type:"text",name:"description",id:"description",onChange:p,placeholder:"description"}),Object(i.jsx)("button",{className:"btn my-card-btn-success mt-3 mx-2",children:"Submit"})]})})}):Object(i.jsx)("div",{className:"row",children:Object(i.jsxs)("div",{className:"col-6 offset-3 d-flex flex-column align-items-center mt-5",children:[Object(i.jsx)("div",{className:"loader"}),Object(i.jsx)("span",{className:"my-card-body",children:"Access denied! :(, You will be redirected back in 5 seconds"})]})})]})};var v=()=>{const[e,t]=Object(c.useState)(""),[a,s]=Object(c.useState)(""),[l,r]=Object(c.useState)(""),[o,m]=Object(c.useState)(!1),[u,g]=Object(c.useState)(!1),h=Object(n.g)();Object(c.useEffect)((()=>{const e=localStorage.getItem("token");b(e).then((e=>{if(e.data.message){m(!0);document.getElementById("alert").style.display="none"}else x()})).catch((e=>{console.log("Errrorrr",e)}))}),[]);const p=e=>{"email"===e.target.name?t(e.target.value):"password"===e.target.name&&s(e.target.value)},x=()=>{setTimeout((()=>{h.goBack()}),3e3)};return Object(i.jsxs)("div",{children:[u?Object(i.jsx)(n.a,{to:"/"}):null,o?Object(i.jsxs)("div",{className:"row",children:[Object(i.jsx)(d,{user_id:l}),Object(i.jsxs)("div",{className:"col-6 offset-3",children:[Object(i.jsxs)("div",{className:"alert alert-danger alert-dismissible fade show",role:"alert",id:"alert",children:[Object(i.jsx)("span",{id:"danger-message"}),Object(i.jsx)("button",{type:"button",className:"btn-close","data-bs-dismiss":"alert","aria-label":"Close"})]}),Object(i.jsxs)("form",{onSubmit:t=>{t.preventDefault(),e.length>0&&a.length>0&&(async(e,t)=>{const a=new FormData;return a.append("email",e),a.append("password",t),await j.a.post("http://localhost:8000/login",a)})(e,a).then((e=>{if(e.data.message){document.getElementById("alert").style.display="block";document.getElementById("danger-message").innerText=e.data.message}else localStorage.setItem("token",e.data.token),r(e.data.user_id),g(!0)})).catch((e=>{console.log("Errorrr",e)}))},children:[Object(i.jsx)("label",{className:"form-label",htmlFor:"email",children:"Email"}),Object(i.jsx)("input",{required:!0,onChange:p,id:"email",className:"form-control",placeholder:"email",type:"email",name:"email"}),Object(i.jsx)("label",{className:"form-label",htmlFor:"password",children:"Password"}),Object(i.jsx)("input",{required:!0,onChange:p,id:"password",name:"password",className:"form-control",type:"password",placeholder:"password"}),Object(i.jsx)("button",{className:"btn my-card-btn-success mt-3 mx-2",children:"Login"})]})]})]}):Object(i.jsx)("div",{className:"row",children:Object(i.jsxs)("div",{className:"col-6 offset-3 d-flex flex-column align-items-center mt-5",children:[Object(i.jsx)("div",{className:"loader"}),Object(i.jsx)("span",{className:"my-card-body",children:"Logged in!.You will be redirected back in 3 seconds"})]})})]})};var y=()=>{const[e,t]=Object(c.useState)(""),[a,s]=Object(c.useState)(""),[l,r]=Object(c.useState)(""),[o,m]=Object(c.useState)(""),[u,g]=Object(c.useState)(!1),[h,p]=Object(c.useState)(!1),x=Object(n.g)();Object(c.useEffect)((()=>{const e=localStorage.getItem("token");b(e).then((e=>{e.data.message?g(!0):(m(e.data.user_id),v())})).catch((e=>{console.log("Errorrr",e)}))}),[]);const O=e=>{"email"===e.target.name?t(e.target.value):"password"===e.target.name?s(e.target.value):"username"===e.target.name&&r(e.target.value)},v=()=>{setTimeout((()=>{x.goBack()}),3e3)};return Object(i.jsxs)("div",{children:[h?Object(i.jsx)(n.a,{to:"/"}):null,u?Object(i.jsxs)("div",{className:"row",children:[Object(i.jsx)(d,{user_id:o}),Object(i.jsx)("div",{className:"col-6 offset-3",children:Object(i.jsxs)("form",{onSubmit:t=>{t.preventDefault(),e.length>0&&l.length>0&&a.length>0&&(async(e,t,a)=>{const c=new FormData;return c.append("email",e),c.append("password",t),c.append("username",a),await j.a.post("http://localhost:8000/register",c)})(e,a,l).then((e=>{localStorage.setItem("token",e.data.token),g(!1),p(!0)})).catch((e=>{console.log("Erroorr",e)}))},children:[Object(i.jsx)("label",{className:"form-label",htmlFor:"username",children:"Username"}),Object(i.jsx)("input",{onChange:O,id:"username",name:"username",className:"form-control",type:"text",placeholder:"username",required:!0}),Object(i.jsx)("label",{className:"form-label",htmlFor:"email",children:"Email"}),Object(i.jsx)("input",{onChange:O,id:"email",className:"form-control",placeholder:"email",type:"email",name:"email",required:!0}),Object(i.jsx)("label",{className:"form-label",htmlFor:"password",children:"Password"}),Object(i.jsx)("input",{onChange:O,id:"password",name:"password",className:"form-control",type:"password",placeholder:"password",required:!0}),Object(i.jsx)("button",{className:"btn my-card-btn-success mt-3 mx-2",children:"Register"})]})})]}):Object(i.jsx)("div",{className:"row",children:Object(i.jsxs)("div",{className:"col-6 offset-3 d-flex flex-column align-items-center mt-5",children:[Object(i.jsx)("div",{className:"loader"}),Object(i.jsx)("span",{className:"my-card-body",children:"You are logged in!.You will be redirected back in 3 seconds"})]})})]})};var f=()=>{const e=Object(n.g)();Object(c.useEffect)((()=>{t()}));const t=()=>{setTimeout((()=>{e.goBack()}),3e3)};return Object(i.jsx)("div",{className:"row",children:Object(i.jsxs)("div",{className:"col-6 offset-3 d-flex flex-column align-items-center mt-5",children:[Object(i.jsx)("div",{className:"loader"}),Object(i.jsx)("h2",{className:"my-card-body",children:"Oops! Error 404 :("}),Object(i.jsx)("h3",{className:"my-card-body",children:"No page found. You will be directed back in 3 seconds"})]})})};var N=()=>Object(i.jsxs)(n.d,{children:[Object(i.jsx)(n.b,{exact:!0,path:"/",children:Object(i.jsx)(u,{})}),Object(i.jsx)(n.b,{exact:!0,path:"/campground",children:Object(i.jsx)(h,{})}),Object(i.jsx)(n.b,{exact:!0,path:"/campground/new",children:Object(i.jsx)(p,{})}),Object(i.jsx)(n.b,{exact:!0,path:"/campground/:id",children:Object(i.jsx)(x,{})}),Object(i.jsx)(n.b,{exact:!0,path:"/campground/edit/:id",children:Object(i.jsx)(O,{})}),Object(i.jsx)(n.b,{exact:!0,path:"/login",children:Object(i.jsx)(v,{})}),Object(i.jsx)(n.b,{exact:!0,path:"/register",children:Object(i.jsx)(y,{})}),Object(i.jsx)(n.b,{path:"*",children:Object(i.jsx)(f,{})})]});r.a.render(Object(i.jsx)(s.a.StrictMode,{children:Object(i.jsx)(o.a,{children:Object(i.jsx)(N,{})})}),document.getElementById("root"))}},[[55,1,2]]]);
//# sourceMappingURL=main.79cb78e7.chunk.js.map