import React from 'react'
import styles from '../../styles/footer.module.css'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div>
      <div className={styles.leftSide}>
       <Link to='/contact'>Contact</Link>
      <Link to="/about">About us</Link>
      </div>
      <div>
        {/* follow us on */}
        <div>
          <ul>
            <li>
              <Link></Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
