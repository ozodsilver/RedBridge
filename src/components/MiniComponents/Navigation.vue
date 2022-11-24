<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <!-- Container wrapper -->
  <div class="container-fluid">
    <!-- Toggle button -->
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Collapsible wrapper -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!-- Navbar brand -->
      <a class="navbar-brand mt-2 mt-lg-0" href="#">
        <img
          src="../../assets/logo.svg "
          height="60"
          alt="MDB Logo"
          loading="lazy"
        />
      </a>
      <!-- Left links -->
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/Home"  class="nav-link " style="cursor: pointer;" >Teachers</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Students" class="nav-link" >Students</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Grades" class="nav-link" >Grades</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/Subjects" class="nav-link" >Subjects</router-link>
        </li>
      </ul>
    </div>
  </div>


  <div class="px-4 py-2 badge bg-danger mx-3">
    {{info.userlar}}  {{info.users}} {{info.grades}} {{info.Subjects}}
  </div>
</nav>
    </div>
</template>

<script>
export default {


    props:['userlar', 'users', 'grades', 'Subjects'],

    setup(props){
     let info = props
console.log(info);
     return{ info}
    },


 
};
</script>

<style lang="scss" scoped>

</style>