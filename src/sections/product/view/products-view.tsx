import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { initialInventory } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

const formatToRupiah = (amount: number): string =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);

export function ProductsView() {
  const [values, setValues] = useState(() => {
    const storedInventory = localStorage.getItem('inventory');
    return storedInventory ? JSON.parse(storedInventory) : initialInventory;
  });

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(values));
  }, [values]); // Update storage whenever `values` change

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedValues = values.map((item: any, i: number) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    setValues(updatedValues);
  };

  const handleSubmitRecipe = () => {
    setValues(initialInventory);
  };

  const totalCogs =
    values?.reduce((total: number, item: any) => total + item.quantity * item.price, 0) || 0;

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 0 }}>
        Recipe
      </Typography>
      <p>Input your recipe here</p>

      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <div>
          {values?.map((item: any, index: number) => (
            <TextField
              key={item.item}
              label={item.label}
              type="number"
              variant="filled"
              onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
              value={item.quantity}
              InputLabelProps={{
                shrink: true,
              }}
            />
          ))}
        </div>
        {/* <div>
          <TextField
            id="filled-number"
            label="15 g of aren sugar:"
            type="number"
            variant="filled"
            onChange={(e) => setValues({ ...values, sugar: Number(e.target.value) })}
            value={values.sugar}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="filled-number"
            label="150 ml of milk:"
            type="number"
            variant="filled"
            onChange={(e) => setValues({ ...values, milk: Number(e.target.value) })}
            value={values.milk}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="filled-number"
            label="20 g of ice cube:"
            type="number"
            variant="filled"
            onChange={(e) => setValues({ ...values, iceCube: Number(e.target.value) })}
            value={values.iceCube}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="filled-number"
            label="1 pcs of plastic cup:"
            type="number"
            variant="filled"
            onChange={(e) => setValues({ ...values, plasticCup: Number(e.target.value) })}
            value={values.plasticCup}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="filled-number"
            label="20 g of coffee bean:"
            type="number"
            variant="filled"
            onChange={(e) => setValues({ ...values, coffeeBean: Number(e.target.value) })}
            value={values.coffeeBean}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="filled-number"
            label="50 ml of mineral water:"
            type="number"
            variant="filled"
            onChange={(e) => setValues({ ...values, mineralWater: Number(e.target.value) })}
            value={values.mineralWater}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div> */}
      </Box>

      <Typography variant="h4" sx={{ mb: 0, mt: 5 }}>
        Total COGS:
      </Typography>
      <p style={{ marginBottom: '50px' }}>{formatToRupiah(totalCogs)}</p>

      <Button
        style={{ marginBottom: '50px', width: '100%', maxWidth: '200px' }}
        variant="contained"
        onClick={handleSubmitRecipe}
      >
        Set Recipe
      </Button>

      {/* <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} /> */}
    </DashboardContent>
  );
}
