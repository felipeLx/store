// Address form to collect user's address for Stripe Checkout
export default function AddressForm() {
    return(
        <div className="flex flex-col">
            <input type="hidden" name="country" value="Brazil" />
            <label htmlFor="line1">Endereço</label>
            <input type="text" name="line1" id="line1" />
            <label htmlFor="line2">Complemento</label>
            <input type="text" name="line2" id="line2" />
            <label htmlFor="city">Cidade</label>
            <input type="text" name="city" id="city" />
            <label htmlFor="state">Estado</label>
            <input type="text" name="state" id="state" />
            <label htmlFor="zip">CEP</label>
            <input type="text" name="zip" id="zip" />
        </div>
    )
}