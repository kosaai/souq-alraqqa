<?php 
  osc_goto_first_locale();

  if(function_exists('im_messages')) {
    if(osc_is_web_user_logged_in()) {
      $message_count = ModelIM::newInstance()->countMessagesByUserId( osc_logged_user_id() );
      $message_count = $message_count['i_count'];
    } else {
      $message_count = 0;
    }
  }

  $loc = osc_get_osclass_location();
  $sec = osc_get_osclass_section();
?>


<div id="header-bar">
  <div class="inside">
    <?php osc_run_hook('header_top'); ?>
    
    <div class="right-block not767">
      <a class="publish round3 tr1" href="<?php echo osc_item_post_url(); ?>">
        <span class="non-resp"><?php _e('Add listing', 'starter'); ?></span>
        <span class="resp"><?php _e('Add', 'starter'); ?></span>
      </a>

      <div class="user-header-block">
        <a class="picture tr1<?php if(osc_is_web_user_logged_in()) { ?> has-menu<?php } ?>" href="<?php echo osc_user_dashboard_url(); ?>"><img src="<?php echo starter_profile_picture(osc_logged_user_id(), 'small', true); ?>" alt="<?php echo osc_esc_html(__('User picture', 'starter')); ?>"/></a>

        <?php if(osc_is_web_user_logged_in()) { ?>
          <div class="user_account user-header" style="display:none;">
            <div id="sidebar">
              <?php echo starter_user_menu(); ?>
            </div>
          </div>
        <?php } ?>
      </div>

      <div class="search-top">
        <form action="<?php echo osc_base_url(true); ?>" method="get" class="nocsrf spin" >
          <input type="hidden" name="page" value="search" />
          <input type="text" name="sPattern" id="query" value="<?php echo osc_esc_html(osc_search_pattern()); ?>" placeholder="<?php _e('Search...', 'starter'); ?>" autocomplete="off" />
 
          <button type="submit"><i class="fa fa-search"></i></button>
        </form>
      </div>
    </div>   


    <div class="middle-block logo">
      <a class="resp-logo" href="<?php echo osc_base_url(); ?>">
        <?php echo logo_header(); ?>
        <div class="loader"></div>
      </a>
    </div>

    <?php
      $c = 5;

      if(!function_exists('osp_install')) {
        $c--;
      }

      if(!(function_exists('im_messages') && (osc_is_web_user_logged_in() || osc_get_preference('link_reg_only','plugin-instant_messenger') <> 1))) {
        $c--;
      }
    ?>


    <div class="left-block c<?php echo $c; ?>">
      <a href="<?php echo osc_base_url(); ?>" class="le-btn home<?php if(osc_is_home_page()) { ?> active<?php } ?>">
        <i class="fa fa-home"></i>
        <span><?php _e('Home', 'starter'); ?></span>
      </a>

      <?php if(osc_is_web_user_logged_in()) { ?>
        <?php $items_count = (osc_is_web_user_logged_in() ? Item::newInstance()->countByUserID(osc_logged_user_id()) : 0); ?>

        <a class="le-btn listings not767" href="<?php echo osc_user_list_items_url(); ?>">
          <i class="fa fa-list-ul"></i> 
          <span><?php _e('Listings', 'starter'); ?></span> 

          <?php if($items_count > 0) { ?>
            <em class="counter"><?php echo $items_count; ?></em>
          <?php } ?>
        </a>
      <?php } ?>

      <?php if(function_exists('im_messages') && (osc_is_web_user_logged_in() || osc_get_preference('link_reg_only','plugin-instant_messenger') <> 1)) { ?>
        <a class="le-btn messages" href="<?php echo osc_route_url( 'im-threads'); ?>">
          <i class="fa fa-envelope-o"></i> 
          <span><?php _e('Messages', 'starter'); ?></span> 

          <?php if($message_count > 0 || 1==1) { ?>
            <em class="counter"><?php echo $message_count; ?></em>
          <?php } ?>
        </a>
      <?php } ?>


      <?php if(function_exists('osp_install')) { ?>
        <?php
          $cart_count = 0;
          if(osc_is_web_user_logged_in()) {
            $cart = ModelOSP::newInstance()->getCart(osc_logged_user_id());
            $cart_count = count(array_filter(explode('|', $cart)));
          }
        ?>

        <a class="le-btn cart" href="<?php echo osc_route_url('osp-cart'); ?>">
          <i class="fa fa-shopping-basket"></i> 
          <span><?php _e('Cart', 'starter'); ?></span> 

          <?php if($cart_count > 0) { ?>
            <em class="counter"><?php echo $cart_count; ?></em>
          <?php } ?>
        </a>
      <?php } ?>


      <div class="language not767">
        <?php if ( osc_count_web_enabled_locales() > 1) { ?>
          <?php $current_locale = mb_get_current_user_locale(); ?>

          <?php osc_goto_first_locale(); ?>
          <div id="lang-open-box">
            <span id="lang_open">
              <span class="le-btn">
                <i class="fa fa-language"></i>
                <span class="non-resp"><?php echo $current_locale['s_short_name']; ?></span>
                <span class="resp"><?php echo strtoupper(substr($current_locale['pk_c_code'], 0, 2)); ?></span>

                <i class="fa fa-angle-down arrow"></i>
              </span>
            </span>

            <div id="lang-wrap" class="mb-tool-wrap">
              <div class="mb-tool-cover">
                <ul id="lang-box">
                  <?php $i = 0 ;  ?>
                  <?php while ( osc_has_web_enabled_locales() ) { ?>
                    <li <?php if( $i == 0 ) { echo "class='first'" ; } ?> title="<?php echo osc_esc_html(osc_locale_field("s_description")); ?>"><a id="<?php echo osc_locale_code() ; ?>" href="<?php echo osc_change_language_url ( osc_locale_code() ) ; ?>"><span><?php echo osc_locale_name(); ?></span><?php if (osc_locale_code() == $current_locale['pk_c_code']) { ?><i class="fa fa-check"></i><?php } ?></a></li>
                    <?php $i++ ; ?>
                  <?php } ?>
                </ul>
              </div>
            </div>
          </div>
        <?php } ?>
      </div>

      <a href="<?php echo osc_search_url(array('page' => 'search')); ?>" class="le-btn search is767<?php if(osc_is_search_page()) { ?> active<?php } ?>">
        <i class="fa fa-search"></i>
      </a>

      <a href="<?php echo osc_user_dashboard_url(); ?>" class="le-btn user is767<?php if($loc == 'user') { ?> active<?php } ?>">
        <i class="fa fa-user"></i>
      </a>
    </div>

    <?php osc_run_hook('header_bottom'); ?>
  </div>
</div>

<?php osc_run_hook('header_after'); ?>


<div id="header-line" data-loc="<?php echo $loc; ?>" data-sec="<?php echo $sec; ?>">
  <div class="inside">
    <h1>
      <?php 
        if(osc_is_home_page()) {
          echo osc_page_title(); 
        } else if(osc_is_ad_page()) {
          echo '<span>' . osc_item_title() . '</span>';


          $item_extra = starter_item_extra( osc_item_id() );

          if($item_extra['i_sold'] == 1) {
            echo '<div class="elem sold">' . __('Sold', 'starter') . '</div>';
          } else if($item_extra['i_sold'] == 2) { 
            echo '<div class="elem reserved">' . __('Reserved', 'starter') . '</div>';
          }

          if(osc_item_is_premium()) {
            echo '<div class="elem premium">' . __('Premium', 'starter') . '</div>';
          }

          if(!in_array(osc_item_category_id(), starter_extra_fields_hide())) {
            if(starter_condition_name($item_extra['i_condition'])) {
              echo '<div class="elem condition">' . __('Condition', 'starter') . ': <span>' . starter_condition_name($item_extra['i_condition']) . '</span></div>';
            }

            if(starter_condition_name($item_extra['i_transaction'])) {
              echo '<div class="elem transaction">' . __('Transaction', 'starter') . ': <span>' . starter_transaction_name($item_extra['i_transaction']) . '</span></div>';
            }
          }

        } else if(osc_is_search_page()) {
          $cat_id = osc_search_category_id();
          $cat_id = isset($cat_id[0]) ? $cat_id[0] : '';

          $cat_full = Category::newInstance()->findByPrimaryKey($cat_id);

          $cat = @$cat_full['s_name'];

          $entries = array_filter(array_map('ucfirst', array($cat, osc_search_region(), osc_search_city())));

          if(count($entries) > 0) {
            echo implode(' - ', $entries);
          } else {
            _e('Search', 'starter');
          }

          echo ' - ' . osc_search_total_items() . ' ' . (osc_search_total_items() == 1 ? __('result', 'starter') : __('results', 'starter'));

        } else if ($loc == 'register') {
          _e('Authenticate', 'starter');

        } else if ($loc == 'login' && $sec == 'recover') {
          _e('Recover password', 'starter');

        } else if ($loc == 'item' && $sec == 'item_add') {
          _e('Publish new listing', 'starter');

        } else if ($loc == 'item' && $sec == 'item_edit') {
          _e('Edit your listing', 'starter');

        } else if ($loc == 'user' && $sec == 'pub_profile') {
          echo sprintf(__('%s\'s profile', 'starter'), osc_user_name());

        } else if ($loc == 'user' && $sec == 'items') {
          _e('User items', 'starter');

        } else if ($loc == 'user' && $sec == 'alerts') {
          _e('User alerts', 'starter');

        } else if ($loc == 'user' && $sec == 'profile') {
          _e('User profile', 'starter');

        }
      ?>
    </h1>
  </div>
</div>


<?php
  // SHOW SEARCH BAR AND CATEGORY LIST ON HOME & SEARCH PAGE
  if(osc_is_home_page()) {
    osc_current_web_theme_path('inc.search.php');
  }

  if(osc_is_home_page() or osc_is_search_page()) {
    osc_current_web_theme_path('inc.category.php');
  } else if(osc_is_ad_page()) {
    osc_current_web_theme_path('inc.item.php');
  }

  // GET CURRENT POSITION
  $position = array(osc_get_osclass_location(), osc_get_osclass_section());
  $position = array_filter($position);
  $position = implode('-', $position);
?>

<div class="container-outer <?php echo $position; ?>">


<?php if(!osc_is_home_page()) { ?>
  <div class="container">
<?php } ?>

<?php if ( OSC_DEBUG || OSC_DEBUG_DB ) { ?>
  <div id="debug-mode" class="noselect"><?php _e('You have enabled DEBUG MODE, autocomplete for locations and items will not work! Disable it in your config.php.', 'veronka'); ?></div>
<?php } ?>


<?php if(function_exists('scrolltop')) { scrolltop(); } ?>


<div class="clear"></div>


<div class="flash-wrap">
  <?php osc_show_flash_message(); ?>
</div>


<?php View::newInstance()->_erase('countries'); ?>
<?php View::newInstance()->_erase('regions'); ?>
<?php View::newInstance()->_erase('cities'); ?>	