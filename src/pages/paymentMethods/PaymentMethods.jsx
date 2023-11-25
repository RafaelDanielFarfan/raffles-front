import React from 'react'
import './paymentMethods.scss'
const PaymentMethods = () => {
    return (
        <main className='payment__main'>
            <h2 className='payment__h2'>MÉTODOS DE PAGO</h2>

            <article className='payment__article'>
                <div className='payment__bank'>
                    <h3>VENEZUELA</h3>
                    <p>Banco Banesco</p>
                    <p>Olga Guzmán</p>
                    <p>CI: 1.957.082</p>
                    <p>Cuenta de ahorro</p>
                    {/* <p>Número de cuenta</p> */}
                    <p>0134-0467-4146-7215-8856</p>
                </div>
                <div className='payment__bank'>
                    <h3>COLOMBIA</h3>
                    <p>Bancolombia</p>
                    <p>Cuenta de ahorro</p>
                    <p>Número de cuenta</p>
                    <p>41282567294</p>
                </div>
                {/* <div className='payment__bank'>
                    <h3>ESPAÑA</h3>
                    <p>Banco de España</p>
                    <p>Número de cuenta</p>
                    <p>125469874555555</p> 
                </div> */}

            </article>

        </main>
    )
}

export default PaymentMethods