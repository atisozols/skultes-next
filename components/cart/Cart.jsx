'use client';
import Container from '../ui/Container';
import Section from '../ui/Section';
import CartContent from './CartContent';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const { cart } = useCart();

  return (
    cart.length > 0 && (
      <Section title={'Rezervāciju grozs'}>
        <Container>
          <CartContent />
        </Container>
      </Section>
    )
  );
};

export default Cart;
