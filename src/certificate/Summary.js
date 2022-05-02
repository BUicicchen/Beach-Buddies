import React from 'react'
import './Summary.css';

function Summary() {
  return (
    <div style = {{margin:'40px'}}>
        <table>
    <tr>
      <td>Type of Trash</td>
      <td>Amount</td>
      <td>Total</td>
    </tr>
    <tr>
      <td>Type 1</td>
      <td>__##__</td>
      <td>- -</td>
    </tr>
    <tr>
      <td>Type 2</td>
      <td>__##__</td>
      <td>- -</td>
    </tr>
    <tr>
      <td>...</td>
      <td>__##__</td>
      <td>- -</td>
    </tr>
    <tr>
      <td>Type n</td>
      <td>__##__</td>
      <td>- -</td>
    </tr>
  </table>
  </div>
  )
}

export default Summary