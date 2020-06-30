import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import {getAllFilters, 
        changeSearchPhrase,
        addTags,
        removeTags,
        changeDuration} from '../../../redux/filtersRedux';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

// const mapDispatchToProps = dispatch => ({
//   changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
//   addTags: tag => dispatch(addTags(tag)),
//   removeTags: tag => dispatch(removeTags(tag)),
//   changeDuration: (type, value) => dispatch(changeDuration(type, value)),
// });

export default connect(mapStateToProps, {changeSearchPhrase, addTags, removeTags, changeDuration})(TripListOptions);
