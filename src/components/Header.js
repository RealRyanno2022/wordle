import React from 'react'
import styles from './Header.module.css';
import HeaderBox from './HeaderBox';
function Header() {
  return (
    <div>
        <div className={styles.header}>Test</div>
        <HeaderBox />
        <HeaderBox />
        <HeaderBox />
    </div>
  )
}

export default Header
