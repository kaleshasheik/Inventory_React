import * as React from 'react'
import Avatar from '@material-ui/core/Avatar'
import PersonAdd from '@material-ui/icons/Person'

export class NotFound extends React.Component<{}, {}> {
 

    render() {
        return (
            <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div style={{marginTop: '20%', padding: '40px 15px', textAlign: 'center'}}>
                       
                        <h1>
                            Oops!</h1>
                        <h2>
                            404 Not Found</h2>
                        <div className="error-details">
                            Sorry, an error has occured, Requested page not found!
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
        )
    }
}