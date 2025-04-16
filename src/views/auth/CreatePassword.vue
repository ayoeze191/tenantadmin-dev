<template>
    <main class="py-6 bg-white w-full h-screen overflow-y-scroll">
      <div class="w-4/6 mx-auto py-4">
        <img class="mx-auto w-21 mb-5" src="../../assets/logo.svg" alt="logo" />
        <p class="auth_header_text">Create Password</p>
        <p class="auth_subheader_text">Access your administrative account</p>

        <form class="auth_form">
            <!-- form block  -->
            <label for="password" class="input_label">
                Create Password
            </label>
            <input id="password" name="password" type="password" class="input mt-4 mb-10"  />
            <!-- form block  -->
            <label for="createPassword" class="input_label">
                Confirm Password
            </label>
            <input id="createPassword" name="createPassword" class="input mt-4 mb-10"  />

            <button class="btn btn_primary">
                Submit
            </button>
        </form>
      </div>
    </main>
  </template>

<script>
export default {

}
</script>

<style>

</style>