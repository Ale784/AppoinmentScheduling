/* eslint-disable react/prop-types */
export function Home({userinfo = []}){

    return(
        <header>

            {
                userinfo.map(x => (
                    <div key={x.id}>
                        <p>{x.username}</p>
                    </div>
                ))
     
            }

        </header>
    )
}