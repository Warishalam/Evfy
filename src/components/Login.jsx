import React from 'react'

const Login = () => {
  const login_post = async (obj) => {
    if (obj.MOBILE == "" || obj.PASSWORD == "") {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'All Fields Are Compulsory'
      })
      return;
    }
 
    try {
      let res = await fetch(
        "https://orion.equinoxlab.com/api/User.svc/User_login",
        {
          method: "Post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            MOBILE: obj.MOBILE,
            PASSWORD: obj.PASSWORD,
          }),
        }
      );
      let data = await res.json();

      if (data.response[0].MESSAGE == "Insert valid Login id and Password") {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: 'Please enter right credential'
        })
      }
      if (data.response[0].MESSAGE == "Please check user id or password") {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: 'Please check user id or password'
        })
      }

  return (
    <div>
          <div className="col-sm-12 col-md-9" id={styles.left_part}>
          <img src={recruitment} alt="" className="img-fluid" />
        </div>
        <div className="col-sm-12 col-md-3" id={styles.right_part}>
          <h2>Welcome back</h2>
          <p>Today will be great</p>
          <TextField
            id="standard-basic"
            label="Mobile Number"
            type="number"
            onInput = {(e) =>{
              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
          }}
            inputProps={{ maxLength: 10 }}
            variant="standard"
            sx={{ width: "80%" }}
            onChange={(e) => setMobile(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Password"
            type="password"
            variant="standard"       
            sx={{ width: "80%", marginTop: "20px" }}
            onKeyUp={handleInput}
          />
          <Button
            variant="contained"
            id={styles.login_btn}
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
    </div>
  )
}

export default Login