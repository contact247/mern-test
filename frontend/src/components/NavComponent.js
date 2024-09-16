import { Link, useNavigate } from "react-router-dom";
const NavComponent = () => {
    const navigate = useNavigate();

    const username = localStorage.getItem('username');
  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('username'); // Remove the username from storage
    localStorage.removeItem('token'); // If you're using JWT
    navigate('/'); // Redirect to login page
  };
  
return (
  
        <nav style={styles.nav}>
        <ul style={styles.ul}>
          <li style={styles.li}><Link style={styles.li} to="/admin">Home</Link></li>
          <li style={styles.li}><Link style={styles.li} to="/employee-list">Employee List</Link></li>
        </ul>
        <p>Logged in as: <strong>{username}</strong></p>
        <button style={styles.button} onClick={handleLogout}>Logout</button>
      </nav>

);

};

const styles = {
    nav:{
        display : 'flex',
        width: '100vw',
        justifyContent: 'space-around',
        alignItem:'center',
        background:'lightblue'
    },
    ul:{
        display:'flex',
        flex:1/2,
        gap:'3px',
        justifyContent: 'space-around',
        alignItem:'center'
    },
    li:{
        listStyle:'none',
        textDecoration:'none'
    },
    button:{
        width:'100px',
        height:'40px'
    }
}

export default NavComponent;