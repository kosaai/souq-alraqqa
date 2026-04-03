<div id="sub-nav" class="item-nav">
  <div class="inside">
    <a href="#" class="active" data-type="detail"><span><?php _e('تفاصيل', 'starter'); ?></span></a>
    <a href="#" data-type="location"><span><?php _e('موقع', 'starter'); ?></span></a>
    <a href="#" data-type="contact"><span><?php _e('اتصال', 'starter'); ?></span></a>
    <a href="#" data-type="comments"><span><?php _e('تعليقات', 'starter'); ?></span></a>

    <?php
      $breadcrumb = osc_breadcrumb('<span class="bread-arrow">/</span>', false);
      $breadcrumb = str_replace('<span itemprop="title">' . osc_page_title() . '</span>', '<span itemprop="title">' . __('الرئيسية', 'starter') . '</span>', $breadcrumb);
    ?>

    <?php if( $breadcrumb != '') { ?>
      <div class="breadcrumb">
        <?php echo $breadcrumb; ?>
      </div>
    <?php } ?>
  </div>
</div>
