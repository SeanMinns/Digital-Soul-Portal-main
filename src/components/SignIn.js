import React from "react";
import { useHistory } from 'react-router-dom';
import { postEndPoint } from './Request';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Spinner from '../Spinner';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
    position: "top-right",
    autoClose: "2000",
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnVisibilityChange: true,
    draggable: false,
    pauseOnHover: true,
});

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },

    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props) {
    const classes = useStyles();
    const history = useHistory();

    // true when waiting for an response from API
  const [isLoading, setIsLoading] = React.useState(false);

    const [values, setValues] = React.useState({
        username: "",
        password: "",
    });

    React.useEffect(() => {
        var token = localStorage.getItem('token');
        if(token != null) {
            history.push('/dashboard');
        }
      });
      
    function notify(text, type) {
        switch (type) {
            case "info":
                toast.info(`👍${text}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                break;
            case "error":
                toast.error(`👎${text}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                break;
            default:
                break;
        }
    }

    const handleChange = (prop) =>
        (event) => {
            setValues({
                ...values,
                [prop]: event.target.value,
            });
        };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = {"username": values.username, "password": values.password};
        try{
            setIsLoading(true);
            const response = await postEndPoint('/admin/login/', formData, null);
            const { data } = response;
            if(data.code === 1){
                localStorage.setItem('token', data.token);
                notify("  Login Successful!!!", "info");
                history.push("/dashboard");
            } else if(data.code === 0){
                notify(data.error, "error");
            }
            setIsLoading(false);
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <>
        {isLoading ? <Spinner /> : null}
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                {" "}
                <Typography component="h1" variant="h5" style={{color: "black"}}>
                    Sign in
                </Typography>
                {" "}
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="admin"
                        onChange={handleChange("username")}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={handleChange("password")}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submitHandler}
                    >
                        Sign In{" "}
                    </Button>
                    {" "}
                </form>
                {" "}
            </div>
            {" "}
        </Container>
        </>
    );
}
