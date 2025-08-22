<template>
  <v-app>
    <v-container class="d-flex justify-start">
      <v-avatar class="avatar-3d" color="#90CAF9" size="150" id="source">{{$t('SOURCE_PRODUCT')}}</v-avatar>
      <div class="arrow-button mx-4 d-flex align-center justify-center" @click="syncStructure">{{$t('SYNC_STRUCTURE')}}</div>
      <v-avatar class="avatar-3d ml-4" color="#90CAF9" size="150" id="destination">{{$t('DESTINATION_PRODUCT')}}</v-avatar>
      <div id="alertBox" class="alert"></div>
      <div class="workunder" id="workunder"><img :src="workunderImage"/></div>
    </v-container>
  </v-app>
</template>
<script>
    export default {
        data: function () {
         return {
          url:"",
          evolution:"",
          SecurityContext:"",
          eno_csrf_token:"",
          workunderImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAZCAYAAABD2GxlAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATiSURBVFhHxZdfSCNHHMdndrPZZGNMYkzUnkrr6bX1T7VWaasPFrXgQ99VhKIUwQexogg+KvRFH6QVfKkoPfShh6WFQilVX9QKrdBa8dRTOVERk3hnsv7Jv91k09/sTeSq5jzvov3gxt3fzPzmOzO/+YcjALoCSZJCe3t7gZWVFXlhYQEtLS35Njc3WEmSBSjOYowlg8Eg5uXl6UpLSw3FxcVyQUGBISkpSQtpDHXzSlwp0OVyeUZGRrxjY2NGp9OpOz098SlKeANF0C7CyK0oSGYYZIgoKAW+32RZNksQDEphYaFcW1vrb2xsFEB8InV3fYjAyxBFMTA0NOS02+1ujNA6iPhaw6Iak4AEWvRSIN2q59FnvBY9gDKulJSUo8HBQZfX6/VR19figkAFAGdSd3f3DhEHlfzMMuhTjQYZzUb00sNlMWGbQcCfCHr8C/TgaUtLy1No9LVFXhBInLS3tztZlnkKwr5iWfTqwwOAQIOORy0aDXNQXV196HA4jmlVL8V5gcr9+995bDbbMadB/aZEnEbreS3u3WU1PI8+Zxjsrq+vd/n9/gCt70qeF6isra25bbbk40Qj/v4NO9ZT/3HBICDWaMD1PK89bm1t3YVICtN6X8iZQGiV1NbWdgCx9ijZiqup37iS/65Gp9fh0YSEBP/i4qJIq34hZwJXV1fF3NzcEwjsb3LfYY3UZ9xJtjIFOh5v1dTUuHw+X5BWH5OzWTk9PQ2L8S6C4f1RxzOn1Bx3rInMQ5h8PXNzc4kzMzMiNceGCo1UVlY+MSbgf+6+xWpp0o3x0QecWatFa1VVVU6IxRCVcClqD8qyDDHxN4cx+t1mZ2XVyw0iisoRr8UP5ufnTevr6yfUfCmqQNjCgrD+6SA2Hv/xp3Tl3vy6PHocjqTYmelIJHg0Pj4uQS/GrFMVuL29TTKExSNlk3zfBpwGL/McWpyammJhsgSo+QKqQLfbHYR9FtYqHFStt8DaRugYeuW3nZ0dYXl5OWa9qkCIRQ5WeQSTBM4Ft0bkThrzqygeotnZ2TC1XUAVqNPpQuFwBIXDiFOtt4TDoezIcujh5ORkTIHY4/H4R0dHPZ2dnVaIiRGIjb9omgqs5Sjar+QdznzPiIY1+abv55NUwBi1n4f4C8iRJjguvt/X1+dLS0tD+fn5BvivEQRBA1kwHh4eftLV1cXCLHaDIQTOYrYmrtCGwR8RwsBBl2DPzs6WysvL5YaGBrasrMyEOzo6XAMDA17I9DEp938Bo8TARM2GBecLOKWXa7V8Rl1d3QHu7e119fT08DBRfqB5CbR9F4jaY6XHguQnXFkGMnLwQ455H2ZkZPowHCBPyfhPTEwo+/v7SSD0J0iMDnNUTBQyqfRgMEJCBrzfgYeH1kqFhe/5zGYz7EJRDWox9QeOJNQMnzj6HiXyLM9/bHB1MJkQDLOWXJoUuLUp/f39DuhNazgcfhvSn9/EiQMLPHmQl6TlwnMPHvJutVgsYmNjU7C9/UszOCXxFBcYWPf0ej17dquDLcfV3NxsDgQC38KnBA/pnXR4sjiOs/JwJIZzXCg1NTWUmZkpVVRURCCYcUlJiQWCO27CznMmcGtry9vU1HQ4OzuXBPeRABz7vUVFRQLMKpSVlYVycnJYEMemp6dr4BLEwTJAZh0ZcnWIbgaE/gV3NX1j9Eu0NAAAAABJRU5ErkJggg==',
        };
      },
      mounted: function () {
        var me = this;
        requirejs(
          ["DS/DataDragAndDrop/DataDragAndDrop",'DS/PlatformAPI/PlatformAPI'],
          function (DataDragAndDrop,PlatformAPI) {
            me.createDropable(DataDragAndDrop, document.getElementById("source"));
            me.createDropable(DataDragAndDrop, document.getElementById("destination"));
            me.createDropable(DataDragAndDrop, document.getElementById("workunder"));
            me.url = PlatformAPI.getApplicationConfiguration("app.urls.myapps");
            console.log("URL Set: ", me.url);            
          }
        );
      },
      methods: {
          createDragable: function (DataDragAndDrop, elem) {
            DataDragAndDrop.draggable(elem, {
              data: JSON.stringify(elem.innerText)
            });
          },
          createDropable: function  (DataDragAndDrop, elem) {
            var me = this;
            DataDragAndDrop.droppable(elem, {
                drop: function(data) {
                  console.log(data);
                  data = JSON.parse(data);
                  data = data.data.items[0];
                  console.log(elem.id+":"+data.objectType)
                  if("workunder"!=elem.id && data.objectType=="VPMReference"){
                    elem.innerHTML = data.displayName;
                  } else if("workunder"==elem.id && data.objectType=="Products"){
                    elem.style.backgroundColor = '#ffed78';
                    elem.setAttribute('title', data.displayName);
                  }else {
                    me.showAlert(me.$t('MSG_COBOT_0004'));
                    return;
                  }
                  elem.setAttribute('objectid', data.objectId);
                }
            });
          },
          syncStructure : async function () {
            this.setMessage(this.$t('SYNC1'));
            let p1 = document.getElementById("source").getAttribute('objectid');
            let p2 = document.getElementById("destination").getAttribute('objectid');
            let p3 = document.getElementById("workunder").getAttribute('objectid');
            if( !p1 || !p2){
              this.showAlert(this.$t('MSG_COBOT_0003'));
              return;
            }
            if( !p3 ){
              this.showAlert(this.$t('MSG_COBOT_0004'));
              return;
            }
            this.evolution = "pid:"+p3;
            let sc = await this.sendSimpleRequest("/resources/pno/person/getsecuritycontext","GET");
            this.SecurityContext = sc.SecurityContext;
            console.log("Evolution: "+p3);
            let eno_csrf_token = await this.sendSimpleRequest("/resources/v1/application/CSRF");
            this.eno_csrf_token = eno_csrf_token.csrf.value; 
            let mv = await this.sendSimpleRequest("/resources/v1/modeler/dspfl/dspfl:ModelVersion/"+p3,"GET");
            mv = mv.member[0]
            let expandPayload = this.createExpandRequestBody(mv);
            let url = "/resources/v1/modeler/dseng/dseng:EngItem/"+p1+"/dseng:EngInstance?$fields=dsmveno:CustomerAttributes&$top=2000&$mask=dsmveng:EngInstanceMask.Position";
            let s1 = await this.sendSimpleRequest(url,"GET");
            this.setMessage(this.$t('SYNC2'));
            //let s2 = await this.sendSimpleRequest(url,"GET");
            let s2 = await this.expandWithEffectivity(p2,expandPayload);
            s1=s1.member;
            this.setMessage(this.$t('SYNC3'));
            this.syncStructureInternal(p2,s1,s2);
          },
          addReportData: async function (instance,obj1,action,result,report){
            console.log("Report Data: "+JSON.stringify(instance)+JSON.stringify(obj1));
            let data = {
              "Instance Name":instance.name,
              "Action": action,
              "Result": result,
              "Title": obj1.title,
              "Revision": obj1.revision,
              "Maturity": obj1.state ,
            }
            const customerAttributes = instance.customerAttributes;
            for (const category in customerAttributes) {
                const categoryData = customerAttributes[category];
                for (const key in categoryData) {
                    data[category+"."+key] = categoryData[key];
                }
            }
            report.push(data);
          },
          saveReport: async function (report){
            if(report.length==0)
              return;
            const headers = Object.keys(report[0]);
            const csvRows = [
              headers.join(','), 
              ...report.map(row => headers.map(field => JSON.stringify(row[field] ?? '')).join(',')) // data rows
            ];
            const csvContent = csvRows.join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', "Report.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          },
          /**
           * 
           * @param p2 
           * @param s1 source
           * @param s2 
           */
          syncStructureInternal: async function (p2,s1,s2){
            let report = [];
            if(!s1) s1=[];
            if(!s2) s2=[];
            let delSource = "";
            for (let i = 0; i < s1.length; i++) {
              let obj1=s1[i];
              let rel = "";
              if(obj1.name.toLowerCase().startsWith("tobedeleted") || obj1.name.startsWith("削除")){
                delSource=obj1.referencedObject.id;
                continue;
              }
              let url = "/resources/v1/modeler/dseng/dseng:EngItem/"+obj1.referencedObject.id;
              let objInfo = await this.sendSimpleRequest(url,"GET");
              console.log(objInfo);
              if( objInfo.member[0].title.toLowerCase().startsWith("tobedeleted") || objInfo.member[0].title.startsWith("削除")){
                delSource=obj1.referencedObject.id;continue;
              }
              const invalidCharsArray = objInfo.member[0].title.match(/[^a-zA-Z0-9 ]/g);
              if( invalidCharsArray && invalidCharsArray.length > 0 ){
                // this.showAlert(this.$t('MSG_COBOT_0002')+invalidCharsArray.join(''));
                let result= this.$t('MSG_COBOT_0002')+invalidCharsArray.join('');
                this.addReportData(obj1,objInfo.member[0],"Skipped",result,report);
                continue;
              }
              if( objInfo.member[0].state!="FROZEN" && objInfo.member[0].state!="RELEASED"){
                // this.showAlert(this.$t('MSG_COBOT_0001'));
                this.addReportData(obj1,objInfo.member[0],"Skipped",this.$t('RESULT_COBOT_PART_NOT_FROZEN'),report);
                continue;
              }
              
              for (let j = 0; j < s2.length; j++) {
                let obj2=s2[j];
                console.log("Instance Names: "+obj1.name+":"+obj2.name);
                console.log("referencedObject ids: "+obj1.referencedObject.id+":"+obj2.referencedObject.id);
                if (obj1.name == obj2.name ) {
                  console.log(obj1.name+" "+obj2.name +" "+ obj1.referencedObject.id+" "+obj2.referencedObject.id);
                  if( obj1.referencedObject.id!=obj2.referencedObject.id ){
                    let urlForGet = "/resources/v1/modeler/dseng/dseng:EngItem/"+obj2.referencedObject.id;
                      let objInfoOfRef = await this.sendSimpleRequest(urlForGet,"GET");
                      obj2.referencedObject = objInfoOfRef.member[0];
                    await this.deleteInstance(obj2,report);
                    s2.splice(j, 1); break;
                  }
                  let url = "/resources/v1/modeler/dseng/dseng:EngItem/"+p2+"/dseng:EngInstance/"+obj2.id;
                  let reqBody = obj1;delete reqBody.created;delete reqBody.modified;delete reqBody.referencedObject;delete reqBody.type;delete reqBody.id;delete reqBody.reservedby;
                  reqBody.cestamp=obj2.cestamp;
                  let result = await this.sendRequest(url,reqBody,"PATCH");
                  this.addReportData(obj2,objInfo.member[0],"Update",result,report);
                  s2.splice(j, 1); rel = obj2;break;
                }
              }
              if(!rel){
                let url = "/resources/v1/modeler/dseng/dseng:EngItem/"+p2+"/dseng:EngInstance";
                let reqBody = this.createRequestBody(obj1);
                console.log(reqBody);
                let result = await this.sendRequest(url,reqBody,"POST");
                this.addReportData(obj1,objInfo.member[0],"Add",result,report);
              }
            }
            await this.deleteInstances(delSource, s2,report);
            if(report.length>0)
            this.saveReport(report);
            this.showAlert(this.$t('SYNC_SUCCESS'));
          },
          deleteInstance: async function (obj,report){
            let url = "/resources/v1/modeler/dseng/invoke/dseng:detachEngInstances";
            let instances = [obj.id];
            let result = await this.sendRequest(url,instances,"POST");
            this.addReportData(obj,obj.referencedObject,"Remove",result,report);
          },
          deleteInstances: async function (delSource, s2,report){
            console.log("delSource: "+delSource);
            if(delSource){
              let url = "/resources/v1/modeler/dseng/dseng:EngItem/"+delSource+"/dseng:EngInstance?$fields=dsmveno:CustomerAttributes,dsmveno:attribute.title&$top=2000&$mask=dsmveng:EngInstanceMask.Position";
              let s1 = await this.sendSimpleRequest(url,"GET");
              if( s1 && s1.member ){
                s1=s1.member
                console.log(JSON.stringify(s1));
                console.log(JSON.stringify(s2));
                for (let i = 0; i < s1.length; i++) {
                  let obj1=s1[i];
                  for (let j = 0; j < s2.length; j++) {
                    let obj2=s2[j];
                    console.log(obj1.name +" : "+obj2.name);
                    if (obj1.name == obj2.name ) {
                      let url = "/resources/v1/modeler/dseng/dseng:EngItem/"+obj2.referencedObject.id;
                      let objInfo = await this.sendSimpleRequest(url,"GET");
                      obj2.referencedObject = objInfo.member[0];
                      await this.deleteInstance(obj2,report);
                    }
                  }
                }
              }
            }
          },
          sendSimpleRequest: async function (url,Type){
            var me=this;
            return new Promise((resolve, reject) => {
            requirejs( ["DS/WAFData/WAFData","DS/PlatformAPI/PlatformAPI"], function (WAFData,PlatformAPI) {
              const apiUrl = PlatformAPI.getApplicationConfiguration("app.urls.myapps")+url;
              WAFData.authenticatedRequest(apiUrl, {
                  method: Type,
                  headers: {
                    "Content-Type": "application/json",
                    "ENO_CSRF_TOKEN": me.eno_csrf_token,
                    SecurityContext: me.SecurityContext,
                  },
                  crossOrigin: true,
                  type: "json",
                  onComplete: function (dataResp) {
                    resolve(dataResp);
                  },
                  onFailure: function (error) {
                    reject(JSON.stringify(error));
                  },
                });
              });
            } );
          },
          expandWithEffectivity: async function(p2,expandPayload) {
            let url = "/resources/v1/modeler/dseng/dseng:EngItem/"+p2+"/expand";
            let s2=await this.sendRequestWithBody(url,expandPayload,"POST");
            s2=s2.member;
            let result = [];
            for (let i = 1; i <s2.length; i++) {
              let instance = s2[i];
              if(instance.type=="VPMInstance"){
                url = "/resources/v1/modeler/dseng/dseng:EngItem/"+p2+"/dseng:EngInstance/"+instance.id+"?$mask=dsmveng:EngInstanceMask.Details";
                try{
                let objInfo = await this.sendSimpleRequest(url,"GET");
                result.push(objInfo.member[0]);
                }catch(e){
                  console.log("Error: "+e);
                }
              }
            }
            console.log("ProcessExpandResult: "+JSON.stringify(result));
            return result;
          },
          createExpandRequestBody: function(mv) {
            let body = {
                        "expandDepth": -1,
                        "withPath": false,
                        "filter": {
                          "combinationOfSpecification": "union",
                          "keepChildren": false,
                          "filterSpecifications": [
                            {
                              "filterCriteria": [
                                {
                                  "criteriaType": "config",
                                  "configurationFilterDefinition": {
                                    "version": "0.1",
                                    "volatileFilter": {
                                      "version": "0.2",
                                      "filterType": "Configuration Volatile Filter",
                                      "filterView": "Current" ,
                                      "filterMode": "150%",
                                      "filterSelection": {
                                        "model": {
                                          "name": mv.modelName,
                                          "identifier": mv.modelID
                                        },
                                        "criteria": [
                                          {
                                            "treeSeries": {
                                              "treeSeriesType": "Model Version",
                                              "name": mv.name,
                                              "selections": [
                                                {
                                                  "root": {
                                                    "name": mv.name,
                                                    "type": mv.type,
                                                    "revision": mv.revision
                                                  }
                                                }
                                              ]
                                            }
                                          }
                                        ]
                                      }
                                    }
                                  }
                                }]
                            }]
                        }
                      };
            return body;
          },
          createRequestBody: function(obj1) {
            let attributes = {
              "name": obj1.name,
              "description": obj1.description
            };
            obj1.attributes=attributes;
            return {
              instances: [obj1]
            };
          },
          setMessage:function(txt){
            let alertBox = document.getElementById("alertBox");
            alertBox.innerHTML=txt;
            alertBox.classList.remove("hide","show");
            alertBox.classList.add("show");
          },
          showAlert: function (txt) {
            let alertBox = document.getElementById("alertBox");
            this.setMessage(txt);
            setTimeout(() => {
                alertBox.classList.add("hide");
                setTimeout(() => {
                    alertBox.classList.remove("show", "hide");
                }, 500);
            }, 3000); // Hide after 3 seconds
          },
          sendRequestWithBody: function (url,reqBody,Type){
            var me=this;
            return new Promise((resolve, reject) => {
              requirejs( ["DS/WAFData/WAFData","DS/PlatformAPI/PlatformAPI"], function (WAFData,PlatformAPI) {
                const apiUrl = PlatformAPI.getApplicationConfiguration("app.urls.myapps") + url;
                  WAFData.authenticatedRequest(apiUrl, {
                    method: Type,
                    headers: {
                      "Content-Type": "application/json",
                      "ENO_CSRF_TOKEN": me.eno_csrf_token,
                      "DS-Configuration-Authoring-Context":me.evolution,
                      SecurityContext: me.SecurityContext,
                    },
                    crossOrigin: true,
                    type: "json",
                    data: JSON.stringify(reqBody),
                    onComplete: function (dataResp) {
                      resolve(dataResp);
                    },
                    onFailure: function (error) {
                      reject(error);
                    },
                  });
                });
              } );
            },
          sendRequest: function (url,reqBody,Type){
            var me=this;
            return new Promise((resolve, reject) => {
            requirejs( ["DS/WAFData/WAFData","DS/PlatformAPI/PlatformAPI"], function (WAFData,PlatformAPI) {
              const apiUrl = PlatformAPI.getApplicationConfiguration("app.urls.myapps") + url;
                WAFData.authenticatedRequest(apiUrl, {
                  method: Type,
                  headers: {
                    "Content-Type": "application/json",
                    "ENO_CSRF_TOKEN": me.eno_csrf_token,
                    "DS-Configuration-Authoring-Context":me.evolution,
                    SecurityContext: me.SecurityContext,
                  },
                  crossOrigin: true,
                  type: "json",
                  data: JSON.stringify(reqBody),
                  onComplete: function (dataResp) {
                    resolve("Successful");
                  },
                  onFailure: function (error) {
                    console.log("Error: "+JSON.stringify(error));
                    resolve("Failed");
                  },
                });
              });
            } );
          },
      },
    };
</script>

<style scoped>
.avatar-3d {
  background: linear-gradient(145deg, #90CAF9, #64B5F6); /* Gradient Blue */
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.4); /* Outer Shadow */
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
}
.avatar-3d:hover {
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.6); /* Pop Out Effect */
  transform: translateY(-1px); /* Lift on Hover */
}
.arrow-button {
  width: 150px;
  height: 50px;
  flex-shrink: 0;
  background: linear-gradient(145deg, #64B5F6, #42A5F5); /* Gradient Blue */
  color: white;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4); /* 3D Shadow */
  transition: all 0.3s ease;
  align-self: center;
}
.arrow-button::after {
  content: '';
  position: absolute;
  top: 0;
  right: -25px;
  width: 0;
  height: 0;
  border-left: 25px solid #42A5F5;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
}

.arrow-button:hover {
  box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.6);
  transform: translateY(-2px); /* Lift on Hover */
}
.alert {
    display: none;
    position: fixed;
    bottom: 30px;
    right: 100px;
    color: #e45349;
    padding: 10px 20px;
    border-radius: 5px;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
    transition: opacity 0.5s ease-in-out;
}
.show {
    display: block;
    opacity: 1;
}
.hide {
    opacity: 0;
}
.workunder {
  background: rgb(220, 220, 220);  
  position: fixed;
    bottom: 10px;
    right: 10px;
    width: 40px;
    height: auto;
}

</style>
