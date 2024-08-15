export default function Company({ CustomInput }) {
  return (
    <div className='flex gap-3 flex-col p-[10px]'>
      <CustomInput label='Ruc' textKey='chruc' />
      <CustomInput label='Nombre Comercial' textKey='chnombrecomercial' />
      <CustomInput label='Razon Social' textKey='chrazonsocial' />
    </div>
  )
}
