import * as React from 'react'
import './Header.scss'

export interface HeaderProps { 
  size: any
  text: any
  css: any
}


export class Header extends React.Component<HeaderProps, {}> {
    render() {

      const { size, text, css } = this.props
    
      switch (size) {
        case 1:
          return <h1 className={css}>{text}</h1>
        case 2:
          return <h2 className={css}>{text}</h2>
        case 3:
          return <h3 className={css}>{text}</h3>
        case 4:
          return <h4 className={css}>{text}</h4>
        case 5:
          return <h5 className={css}>{text}</h5>
        case 6:
          return <h6 className={css}>{text}</h6>
        default:
          return <h6 className={css}>{text}</h6>
      }
        
    }
}



   
