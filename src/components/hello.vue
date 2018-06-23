
<template>
  <div>
    <input  v-model="value" placeholder="Enter something..." style="width: 300px"></input>
    <br>
    <span>{{message}}</span>
  </div>
</template>

<script>
  export default {
    //message: 'app',
    data() {
        return {
           message: 'aaaa',
           value: 'valuevalue'
        }
    },

    watch : {
       value:function(val) {
          this.value = val;
          this.message = val * 1000;
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
</style>
