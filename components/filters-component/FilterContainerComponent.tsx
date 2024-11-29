import { motion } from 'framer-motion';

type FilterType = {
  isOpen: boolean;
  styles: string;
};

const FilterContainerComponent = ({
  children,
  filters,
}: {
  children: React.ReactNode;
  filters: FilterType;
}) => {
  return (
    <>
      {filters.isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={filters.styles}>
          {children}
        </motion.div>
      )}
    </>
  );
};

export default FilterContainerComponent;
