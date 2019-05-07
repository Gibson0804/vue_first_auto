
<template>
  <div>
      <div class="w-12" style='margin-left:20px; text-align:left; float:left'>

        <span>接口方法名：</span>
        <input  v-model="funcName" placeholder="请输入方法名" style="width: 150px"></input>
        <br>
        <br>
        <span>接口分组：</span>
        <input  v-model="funcGroup" placeholder="请输入接口分组" style="width: 150px"></input>
        <br>
        <br>
        <span>方法说明：</span>
        <input  v-model="funcDescription" placeholder="请输入方法说明" style="width: 150px"></input>
        <br>
        <br>
        <span>接口类型：</span>
          <input v-model="funcMethod" id="GET" type='radio' value="GET">
          <label for="GET">GET</label>
          <input v-model="funcMethod" id="POST" type='radio' value="POST">
          <label for="POST">POST</label>
        <br>
        <br>
        <div>
          <span>参数相关：</span>
          <button v-on:click = 'addTable'>增加参数</button>
          <button v-on:click = 'delTable'>减少参数</button>
          <span>当前参数个数：{{tables.length}}</span>
          <br>
          <br>
          <table class="customers">
            <tr>
              <th v-for = "head in headList">{{head}}</th>
            </tr>

            <tr v-for = "row in tables">
              <td>
                <label>
                  <input v-model="row.isNeed" type='radio' value="1">是
                </label>
                <label>
                  <input v-model="row.isNeed" type='radio' value="0">否
                </label>
              </td>
              <td>
                <input v-model = 'row.name' type="text" placeholder="参数名" />
              </td>
            <td >
              <label v-for="type in paramType" style="display:block" >
                <input v-model="row.checkType" :id="type.id" type='radio' :value="type.value">
                {{ type.label }}
              </label>
<!-- 
              <select v-model = 'row.checkType' placeholder="参数类型" style="width:100px">
                <option v-for="type in paramType" :value="type.value" >
                  {{ type.label }}
                </option>
              </select> -->
            </td>
            <td><input  v-model = 'row.example' type="text" placeholder="参数示例" /></td>
            <td><input  v-model = 'row.comment' type="text" placeholder="参数说明" /></td>
            </tr>

          </table>

        <br>
        <br>
        <br>
        </div>

          <button v-on:click = 'addOperation'>增加Operation参数</button>
          <button v-on:click = 'delOperation'>去掉Operation参数</button>

        <div>
          <br>
          <br>
          {{tables}}
          <br>
        <pre>{{validateOne}}</pre>

        <textarea class="w-12" style = "height:200px;float:left;margin-right:10px">
            public function {{funcName}}({{paramsInfo2}})
            {

                $result = $this->{{funcGroup}}Repository->{{funcName}}({{paramsInfo2}});

                return $result;
            }
        </textarea>


        <textarea class="w-10"  style = "height:200px;float:left">
            public function {{funcName}}({{paramsInfo2}})
                {

                    $params = [
                        {{paramsInfo3}}];

                    $url = $this->buildURL('/v1/{{funcGroup|fooStyleCss}}/{{funcName|fooStyleCss}}');
                    return $this->{{funcMethod|toLowerCaseFilter}}($url, $params);
                }
        </textarea>


        <pre>{{paramsInfo2}}</pre>
        </div>


        <br>
        <br>

        <br>

      </div>

      <div class="w-10" style="float:right;border:1px solid #ffffff; text-align:left;white-space:normal" >
        <h4>结果</h4>
        <textarea style="width:100%;height:800px;padding:10px;white-space: pre-wrap;">
/**
 * @api {{'{'+funcMethod+'}'}} /v1/{{funcGroup|fooStyleCss}}/{{funcName|fooStyleCss}} {{funcDescription}}
 * @apiName {{funcName}}
 * @apiGroup {{funcGroup}}
 *
 *{{commentParams}}
 *
 * @apiParamExample {curl} Request Example
 * {{curlString}}
 *
 * @apiSuccessExample Success-Response
 *
 *
 */
public function {{funcName}} (Request $request) {
    $this->validate($request, [{{validateOne}}{{operationParamsOne}}
        ], [{{validateTwo}}{{operationParamsTwo}}
        ]);

    $params = $request->all();
    $paramsInfo = array_only($params, [
        {{paramsComma}}
    ]);

    {{Operation}}

    $result = $this->{{funcGroup}}Service->{{funcName}}($paramsInfo{{operationInfo}});

    {{paramsComma2}}

    $result = $this->{{funcGroup}}Service->{{funcName}}({{paramsInfo2}});

    return response()->json(ResultBuilder::buildSucceed($result, '{{funcDescription+'成功!'}}'));
}
        </textarea>
      </div>

    <br>
  </div>
</template>

<script>
var table ={
              name : '',
              isNeed : 1,
              checkType : 0,
              example : '',
              comment : ''
            };

function formatValidate(name, comment, type) {
  var validate = '';

  if (type == 'required') {
    validate = '\n            \''+
      name +
      '.required' +
    '\' => \''+ comment + '必须存在\',';
    return validate;
  }

  validate = 
    '\n            \''+
    name + '.'+ type +
      '\' => \''+ comment + '必须为' + type + '类型\',';
  return validate;
}

function formatValidateOne(name, type) {

    var validate = 
      '\n        \''+
      name+
      '\' => \''+ type + '\',';
  return validate;
}

function firstCaps(str){
  return str.substring(0,1).toUpperCase()+str.substring(1);
}


function camelCase(string){
    return string.replace( /_([a-z])/g, function( all, letter ) {
        return letter.toUpperCase();
    });
}


  export default {
    //message: 'app',
    data() {
        return {
            tables: [JSON.parse(JSON.stringify(table))],
            funcName: 'carCreate',
            funcMethod: 'GET',
            funcGroup: 'car',
            funcDescription: '',
            commentParams: '',
            curlString : '',
            curlParams: '',
            paramsComma: '',
            paramsComma2: '',
            paramsInfo2: '',
            paramsInfo3: '',
            Operation: '',
            operationInfo: '',
            operationParamsOne: '',
            operationParamsTwo: '',
            validateOne: '',
            validateTwo: '',
            params: '',
            res:'',
            message: 'aaaa',
            headList: ['是否必填', '参数名', '参数类型', '参数示例', '参数说明'],
            numsOfparams: 3,
            paramType: [
                    {
                        id: 'ty_null',
                        value: 0,
                        label: '不限'
                    },
                    {
                        id: 'ty_string',
                        value: 'string',
                        label: '字符串'
                    },
                    {
                        id: 'ty_date',
                        value: 'date_format:Y-m-d H:i:s',
                        label: '日期'
                    },
                    {
                        id: 'ty_numeric',
                        value: 'numeric',
                        label: '数字'
                    }
                    ]
        }
    },

   filters:{
      fooStyleCss:function(name) {
        return name.replace(/([A-Z])/g,"_$1").toLowerCase()
      }
   },

   filters:{
      toLowerCaseFilter:function(name) {
        return name.toLowerCase()
      }
   },


   methods:{
        delTable:function(){
          this.tables.pop();
        },
        addTable:function(){
            this.tables.push(JSON.parse(JSON.stringify(table)));
        },
        addOperation:function(){
            this.Operation = '$operationInfo = $this->getOperationInfo($request);';
            this.operationInfo = ', $operationInfo'
            this.operationParamsOne = '\n        \'operator_id\' \=\> \'required|numeric\'\n        \'operator_name\' => \'required|string\',\n        \'operation_from\' => \'required|numeric\',';
            this.operationParamsTwo = '\n            \'operator_id.required\' => \'操作人ID不能为空\',\n            \'operator_id.numeric\' => \'操作人ID必须为数字\',\n            \'operator_name.required\' => \'操作人名字不能为空\',\n            \'operation_from.required\' => \'操作来源不能为空\',\n            \'operation_from.numeric\' => \'操作来源必须为数字\',';
        },
        delOperation:function(){
            this.Operation = '';
            this.operationInfo = ''
            this.operationParamsOne = ''
            this.operationParamsTwo = ''
        },

    },

    watch : {
       tables:{
          handler: function () {
            this.validateOne = '';
            this.validateTwo = '';
            this.commentParams = '';
            this.curlString = '';
            this.paramsComma= '';
            this.paramsComma2= '';
            this.paramsInfo2 = '';
            this.paramsInfo3 = '';

            var type = '';
            var name = '';
            var comment = '';
            var isNeed = 0;
            var example = '';
            var checkType = '';
            var curlParams = '';

            for (var i = 0; i < this.tables.length; i++) {
              type = this.tables[i].checkType;
              name = this.tables[i].name;
              comment = this.tables[i].comment;
              isNeed = this.tables[i].isNeed;
              example = this.tables[i].example;

              this.commentParams += '\n * @apiParam {'+(type==0?'String':firstCaps(type))+'} '+name+' '+comment;


              if (curlParams != '') {
                curlParams += '&'
              }
              curlParams += name + '=' + example

              if (this.funcMethod == 'GET') {
                this.curlString = 'curl \'http://192.168.203.133:13110/new_energy/v1/'+this.funcGroup+this.funcName +'?'+ curlParams+'\''
              }
              if (this.funcMethod == 'POST') {
                this.curlString = 'curl -d \'' + curlParams + '\' \'http://192.168.203.133:13110/new_energy/v1/'+this.funcGroup+this.funcName +'\''
              }

              if (this.paramsComma != '') {
                this.paramsComma += ', '
              }

              this.paramsComma += '\'' + name + '\''


              this.paramsComma2 += '$' + camelCase(name) + ' = $request->get(\''+ name +'\');\n    ';


              if (this.paramsInfo2 != '') {
                this.paramsInfo2 +=  ', ' + '$' + camelCase(name);
              } else {
                this.paramsInfo2 += '$' + camelCase(name) ;
              }

              this.paramsInfo3 += '\'' + name + '\' => $' + camelCase(name) + ',\n                       ';


              if ((type == 0) && (isNeed == 0)) {
                continue;
              }
              if ((type != 0) && (isNeed == 1)) {
                checkType = 'required|' + this.tables[i].checkType;

                this.validateTwo += formatValidate(name, comment, type) 
                this.validateTwo += formatValidate(name, comment, 'required')
                this.validateOne += formatValidateOne(name,  checkType)

              }
              if ((type != 0) && (isNeed == 0)) {
                checkType = this.tables[i].checkType;

                this.validateTwo += formatValidate(name, comment, checkType) 
                this.validateOne += formatValidateOne(name,  checkType)
              }
              if ((type == 0) && (isNeed == 1)) {
                checkType = 'required';

                this.validateTwo += formatValidate(name, comment, 'required')
                this.validateOne += formatValidateOne(name,  checkType)
              }

            }


          },
          deep: true
       },
       funcName:function(val) {
          this.funcName = val;
       },
       message : function (val) {
          this.kilometers = val/ 1000;
          this.message = val;
       }
    }

  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.w-10{
  width: 40%
}
.w-12{
  width: 50%
}

.customers
  {
  font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;
  width:100%;
  border-collapse:collapse;
  }

.customers td, .customers th 
  {
  font-size:1em;
  border:1px solid #98bf21;
  padding:3px 7px 2px 7px;
  }

.customers th 
  {
  font-size:1.1em;
  text-align:left;
  padding-top:5px;
  padding-bottom:4px;
  background-color:#A7C942;
  color:#ffffff;
  }

.customers tr.alt td 
  {
  color:#000000;
  background-color:#EAF2D3;
  }

</style>
