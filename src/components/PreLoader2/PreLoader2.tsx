import React from "react"
import preLoader from "./preLoader.gif"
import styles from "./PreLoader2.module.scss"

export const PreLoader2 = () => {
    return (
        <div className={styles.preLoader}>
            <img src={preLoader}/>
        </div>
    )
}