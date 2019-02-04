import * as React from 'react'
import './Footer.scss'


interface Istyle{

    position: any
    right: number
    bottom: number
    left: number
    backgroundColor: string

}
export interface FooterProps { 
    web: string
    copyright: string
    style?: Istyle
    className?: any
}


export class Footer extends React.Component<FooterProps, {}> {
    render() {

        console.log('footer', this.props.style )
        return ( 
        
        <footer className={this.props.className}>
        <ul>
          <li className='left'>
          <a href='https://www.aricent.com'>{this.props.web} </a>
          </li>
          <li className='right'>{this.props.copyright}</li>
        </ul>
       
      </footer>
        
        )

        
    }
}



   
