export const ModalLayout = ({ children, isShowing }: { children: React.ReactNode; isShowing: boolean }) => {
	return (
		<section className={isShowing ? 'flex ' : 'hidden '}>
			<div className='modal'>{children}</div>
		</section>
	);
};
